package org.iesbelen.nightmarebox.repository;

import org.iesbelen.nightmarebox.domain.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {

}
