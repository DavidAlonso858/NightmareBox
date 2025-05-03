package org.iesbelen.nightmarebox.service;

import org.iesbelen.nightmarebox.domain.Valoracion;
import org.iesbelen.nightmarebox.exception.ValoracionNotFoundException;
import org.iesbelen.nightmarebox.repository.ValoracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValoracionService {

    @Autowired
    private ValoracionRepository valoracionRepository;

    public List<Valoracion> findAll() {
        return valoracionRepository.findAll();
    }

    public Valoracion findById(long id) {
        return valoracionRepository.findById(id).orElseThrow(() -> new ValoracionNotFoundException(id));
    }

    public Valoracion save(Valoracion valoracion) {
        return valoracionRepository.save(valoracion);
    }

    public Valoracion replace(Valoracion valoracion, Long id) {
        return valoracionRepository.findById(id)
                .map(v -> (id.equals(valoracion.getId()) ? valoracionRepository.save(valoracion) : null))
                .orElseThrow(() -> new ValoracionNotFoundException(id));
    }

    public void delete(Long id) {
        valoracionRepository.deleteById(id);
    }
}
