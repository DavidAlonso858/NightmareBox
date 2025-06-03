package org.iesbelen.nightmarebox.utilJWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter { // indica que esta clase es un filtro de Spring que se ejecuta una vez por peticion

    private final UsuarioDetailsServiceImpl usuarioDetailsService;
    private final JwtUtils jwtUtils;

    public JwtAuthFilter(UsuarioDetailsServiceImpl usuarioDetailsService, JwtUtils jwtUtils) {
        this.usuarioDetailsService = usuarioDetailsService;
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization"); // Busca si hay una cabeccera donde se envia el token

        if (request.getServletPath().startsWith("/usuario/login") || request.getServletPath().startsWith("/usuario/signUp") || request.getServletPath().startsWith("/usuario/**")) {
            filterChain.doFilter(request, response);
            return;
        }

        String nombreUsuario = null;
        String jwt = null;

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7); // si tiene y coincide guarda aqui el token luego de Bearer
            nombreUsuario = jwtUtils.extractUsername(jwt); // y aqui el nombre de usuario con la herramienta de jwUtils
        }

        // Comppueba si hay usuario extraido de un token y si nadie está autenticado. 
        // Si se cumple carga los detalles, valida el token 
        // y si coincide las dos cosas lo marca como autenticado
        if (nombreUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.usuarioDetailsService.loadUserByUsername(nombreUsuario);
            if (jwtUtils.validarToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
