package org.iesbelen.nightmarebox.service;

import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.domain.SubGenero;
import org.iesbelen.nightmarebox.dto.PeliculaMediaValoracionDTO;
import org.iesbelen.nightmarebox.exception.PeliculaNotFoundException;
import org.iesbelen.nightmarebox.repository.PeliculaRepository;
import org.iesbelen.nightmarebox.repository.ValoracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;
    @Autowired
    private ValoracionRepository valoracionRepository;

    public List<Pelicula> findAll() {
        return peliculaRepository.findAll();
    }

    public Pelicula encontrarPorId(Long id) {
        return peliculaRepository.findById(id)
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public PeliculaMediaValoracionDTO findById(Long id) {
        Pelicula pelicula = peliculaRepository.findById(id)
                .orElseThrow(() -> new PeliculaNotFoundException(id));

        Double media = valoracionRepository.obtenerMediaValoracionPorPelicula(id);

        PeliculaMediaValoracionDTO dto = new PeliculaMediaValoracionDTO();
        dto.setId(pelicula.getId());
        dto.setTitulo(pelicula.getTitulo());
        dto.setYear(pelicula.getYear());
        dto.setDuracion(pelicula.getDuracion());
        dto.setSinopsis(pelicula.getSinopsis());
        dto.setPremio(pelicula.getPremio());
        dto.setPoster(pelicula.getPoster());
        dto.setPaises(pelicula.getPaises());
        dto.setDirector(pelicula.getDirector());
        dto.setMediaValoracion(media != null ? media : 0.0);

        return dto;
    }

    public Pelicula findByTitulo(String titulo) {
        return peliculaRepository.findByTitulo(titulo).orElseThrow(() -> new PeliculaNotFoundException(titulo));
    }

    public List<Pelicula> findBySubGenero(SubGenero subGenero) {
        return peliculaRepository.findBySubGenero(subGenero);
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
