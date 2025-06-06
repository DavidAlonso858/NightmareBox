package org.iesbelen.nightmarebox.service;

import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.domain.Valoracion;
import org.iesbelen.nightmarebox.exception.ValoracionNotFoundException;
import org.iesbelen.nightmarebox.repository.PeliculaRepository;
import org.iesbelen.nightmarebox.repository.UsuarioRepository;
import org.iesbelen.nightmarebox.repository.ValoracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValoracionService {

    @Autowired
    private ValoracionRepository valoracionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PeliculaRepository peliculaRepository;

    public List<Valoracion> findAll() {
        return valoracionRepository.findAll();
    }

    public Valoracion findById(long id) {
        return valoracionRepository.findById(id).orElseThrow(() -> new ValoracionNotFoundException(id));
    }

    public Valoracion save(Valoracion valoracion) {
        return valoracionRepository.save(valoracion);
    }

    public Valoracion findByUsuarioAndPelicula(Long idUsuario, Long idPelicula) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pelicula pelicula = peliculaRepository.findById(idPelicula)
                .orElseThrow(() -> new RuntimeException("Película no encontrada"));

        return valoracionRepository.findByUsuarioAndPelicula(usuario, pelicula)
                .orElse(null); // o lanzar una excepción si no se encuentra
    }

    public Valoracion replace(Valoracion valoracion, Long id) {
        return valoracionRepository.findById(id)
                .map(v -> {
                    v.setNotaValoracion(valoracion.getNotaValoracion());
                    // Si quieres, puedes también actualizar más campos si es necesario.
                    return valoracionRepository.save(v);
                })
                .orElseThrow(() -> new ValoracionNotFoundException(id));
    }

    public void delete(Long id) {
        valoracionRepository.deleteById(id);
    }
}
