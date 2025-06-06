package org.iesbelen.nightmarebox.repository;

import java.util.Optional;

import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.domain.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {
    // SACAR LA MEDIA DE LA PELI
    @Query("SELECT AVG(v.notaValoracion) FROM Valoracion v WHERE v.pelicula.id = :peliculaId")
    Double obtenerMediaValoracionPorPelicula(@Param("peliculaId") Long peliculaId);

    Optional<Valoracion> findByUsuarioAndPelicula(Usuario usuario, Pelicula pelicula);

}
