package org.iesbelen.nightmarebox.repository;

import org.iesbelen.nightmarebox.domain.SubGenero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubGeneroRepository extends JpaRepository<SubGenero, Long> {
    Optional<SubGenero> findByNombre(String nombre);
}
