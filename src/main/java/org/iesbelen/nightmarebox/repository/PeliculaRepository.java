package org.iesbelen.nightmarebox.repository;

import org.iesbelen.nightmarebox.domain.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
    Optional<Pelicula> findByTitulo(String titulo);
    List<Pelicula> findBySubGeneroId(Long id);

}
