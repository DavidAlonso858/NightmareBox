package org.iesbelen.nightmarebox.utilJWT;

import lombok.RequiredArgsConstructor;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.service.UsuarioService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UsuarioDetailsServiceImpl implements UserDetailsService {
    private final UsuarioService usuarioService;


    @Override
    public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
        Usuario usuario = usuarioService.findByNombre(nombreUsuario);

        return new org.springframework.security.core.userdetails.User(
                usuario.getNombre(),
                usuario.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + usuario.getRolUsuario().name()))
                // .name para que lo pille como string en el codigo
        );
    }
}

