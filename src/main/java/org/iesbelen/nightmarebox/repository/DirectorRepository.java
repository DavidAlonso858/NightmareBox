package org.iesbelen.nightmarebox.repository;

import org.iesbelen.nightmarebox.domain.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {

}
