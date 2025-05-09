package org.iesbelen.nightmarebox.service;

import lombok.RequiredArgsConstructor;
import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.dto.PeliculaMediaValoracionDTO;
import org.iesbelen.nightmarebox.exception.UsuarioNotFoundException;
import org.iesbelen.nightmarebox.repository.PeliculaRepository;
import org.iesbelen.nightmarebox.repository.UsuarioRepository;
import org.iesbelen.nightmarebox.utilJWT.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PeliculaService peliculaService;

    @Autowired
    private JwtUtils jwtUtils;

    private final PasswordEncoder passwordEncoder;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    public Usuario findByNombre(String nombre) {
        return usuarioRepository.findByNombre(nombre).orElseThrow(() -> new UsuarioNotFoundException(nombre));
    }

    // PROBARLO PILLANDO LA ID DEL JWT
    public Usuario agregarPelicula(Long idPelicula, Long idUsuario) {
        Usuario user = this.findById(idUsuario);
        Pelicula peli = this.peliculaService.encontrarPorId(idPelicula);

        user.getPeliculasFavs().add(peli);
        return usuarioRepository.save(user);
    }

    public String generateToken(UserDetails userDetails) {
        return jwtUtils.generateToken(userDetails);
    }

    public Usuario save(Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }


    public Usuario replace(Usuario usuario, Long id) {
        return usuarioRepository.findById(id)
                .map(u -> {
                    if (id.equals(usuario.getId())) {
                        // Hashear la nueva contraseña
                        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
                        return usuarioRepository.save(usuario);
                    } else {
                        return null;
                    }
                })
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }
}
