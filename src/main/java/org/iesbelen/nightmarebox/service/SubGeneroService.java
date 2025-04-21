package org.iesbelen.nightmarebox.service;

import org.iesbelen.nightmarebox.domain.SubGenero;
import org.iesbelen.nightmarebox.exception.PeliculaNotFoundException;
import org.iesbelen.nightmarebox.exception.SubGeneroNotFoundException;
import org.iesbelen.nightmarebox.repository.SubGeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubGeneroService {

    @Autowired
    SubGeneroRepository subGeneroRepository;

    public List<SubGenero> findAll() {
        return subGeneroRepository.findAll();
    }

    public SubGenero findById(Long id) {
        return subGeneroRepository.findById(id).orElseThrow(() -> new SubGeneroNotFoundException(id));
    }

    public SubGenero findByNombre(String nombre) {
        return subGeneroRepository.findByNombre(nombre).orElseThrow(() -> new SubGeneroNotFoundException(nombre));
    }

    public SubGenero save(SubGenero subGenero) {
        return subGeneroRepository.save(subGenero);
    }

    public SubGenero replace(SubGenero subGenero, Long id) {
        return subGeneroRepository.findById(id)
                .map(s -> (id.equals(subGenero.getId()) ? subGeneroRepository.save(subGenero) : null))
                .orElseThrow(() -> new PeliculaNotFoundException(id));
    }

    public void delete(Long id) {
        subGeneroRepository.deleteById(id);
    }

}
