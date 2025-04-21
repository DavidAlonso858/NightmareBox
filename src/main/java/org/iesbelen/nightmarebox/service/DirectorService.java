package org.iesbelen.nightmarebox.service;

import org.iesbelen.nightmarebox.domain.Director;
import org.iesbelen.nightmarebox.exception.DirectorNotFoundException;
import org.iesbelen.nightmarebox.repository.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DirectorService {

    @Autowired
    private DirectorRepository directorRepository;

    public List<Director> findAll() {
        return directorRepository.findAll();
    }

    public Director findById(Long id) {
        return directorRepository.findById(id).orElseThrow
                (() -> new DirectorNotFoundException(id));
    }

    public Director findByNombre(String nombre) {
        return directorRepository.findByNombre(nombre).orElseThrow(() -> new DirectorNotFoundException(nombre));
    }

    public Director save(Director director) {
        return directorRepository.save(director);
    }

    public Director replace(Director director, Long id) {
        return directorRepository.findById(id)
                .map(d -> (id.equals(director.getId()) ? this.directorRepository.save(director) : null))
                .orElseThrow(() -> new DirectorNotFoundException(id));
    }

    public void delete(Long id) {
        directorRepository.deleteById(id);
    }

}

