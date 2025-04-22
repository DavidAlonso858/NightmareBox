package org.iesbelen.nightmarebox.utilJWT;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component // permite la detenccion automatica e inyeccion de dependencias, un BEAN (objeto
           // gestionado por Spring)
public class JwtUtils {

    @Value("${jwt.secret}") // clave del properties
    private String jwtSecret;

    @Value("${jwt.expiration}") // tiempo del properties
    private Long jwtExpirationMs;

    private Key key; // guarda la clave de jwt pero en formato especial

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes()); // conversion de formato de la clave
    }

    public String generarToken(String nombreUsuario) {
        return Jwts.builder() // construye el token poniendo el nombreUsuario como asusnto principal
                .setSubject(nombreUsuario)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // termina con el tiempo en
                                                                                   // milisegundos pasado
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(UserDetails userDetails) { // un atajo
        return generarToken(userDetails.getUsername());
    }

    private Claims extractAllClaims(String token) { // metodo base para leer el token
        return Jwts
                .parserBuilder()
                .setSigningKey(key) // con la clave secreta se lee
                .build()
                .parseClaimsJws(token) // devuelve el cuerpo
                .getBody();
    }

    public String extractUsername(String token) { // Obtiene el nombre de usuario al leer el tokem
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) { // Ayudante para extraer los claims
                                                                                  // (lectura de clave-vallor) y luego sacar algo
                                                                                  // especifico
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Date extractExpiration(String token) { // Obtiene la fecha de acabado al leer el tokem
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean validarToken(String token, UserDetails userDetails) { // Comprueba si pertenece el token a esa persona
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) { // Compueba si ha pasado la fecha o no (12 horas en este caso dura el token)
        return extractExpiration(token).before(new Date());
    }
}
