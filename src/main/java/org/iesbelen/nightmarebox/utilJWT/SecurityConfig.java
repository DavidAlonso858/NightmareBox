package org.iesbelen.nightmarebox.utilJWT;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean // Hasheo de la contra 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean // Filtro personalizado con la clase hecha 
    public JwtAuthFilter jwtAuthFilter(JwtUtils jwtUtils, UserDetailsService userDetailsService) {
        return new JwtAuthFilter((UsuarioDetailsServiceImpl) userDetailsService, jwtUtils);
    }

    @Bean // Define la cadena de filtros y las reglas de acceso
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // desactiva una proteccion
                .authorizeHttpRequests(auth -> auth // QUIEN PUEDE ACCEDER A LA URL
                        .requestMatchers(
                                "/usuario/login",
                                "/usuario/signUp",
                                "/usuario/**",
                                "/pelicula/**",
                                "director/**",
                                "/subgenero/**"

                        ).permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(session -> session // guarda info de sesion, en este caso sin estado (STATELESS)
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // <- AÑADIR FILTRO AQUÍ

        return http.build();
    }

    @Bean // Gestor estandar de Spring para autentificar
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean // Define como debe verificar 
    public AuthenticationProvider authenticationProvider(UsuarioDetailsServiceImpl usuarioDetailsServiceImpl) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(usuarioDetailsServiceImpl); // 👈 este debe ser el bueno
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
}