package org.iesbelen.nightmarebox.service;

import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.exception.PeliculaNotFoundException;
import org.iesbelen.nightmarebox.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;

    public List<Pelicula> findAll() {
        return peliculaRepository.findAll();
    }

    public Pelicula findById(Long id) {
        return peliculaRepository.findById(id)
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }
    public Pelicula findByNombre(String nombre) {
        return peliculaRepository.findByNombre(nombre).orElseThrow(() -> new PeliculaNotFoundException(nombre));
    }

    public Pelicula save(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    public Pelicula replace(Pelicula pelicula, Long id) {
        return peliculaRepository.findById(id)
                .map(p -> (id.equals(pelicula.getId()) ? peliculaRepository.save(pelicula) : null))
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public void delete(Long id) {
        peliculaRepository.deleteById(id);
    }

}
