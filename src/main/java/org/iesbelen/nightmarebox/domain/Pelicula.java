package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Year;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pelicula")
    private Long id;

    @Column(name = "titulo_pelicula", nullable = false)
    @NotBlank
    private String titulo;

    @Column(name = "year_pelicula", nullable = false)
    @JsonFormat(pattern = "yyyy", shape = JsonFormat.Shape.STRING)
    @NotBlank
    private Year year;

    @Column(name = "duracion_pelicula", nullable = false)
    @NotBlank
    private Integer duracion;

    @Column(name = "sinopsis_pelicula")
    private String sinopsis;

    @Column(name = "premio_pelicula")
    private Boolean premio;

    @Column(name = "poster_pelicula")
    private String poster;

    @ElementCollection
    private Set<String> paises;

    @ManyToOne
    @JoinColumn(name = "id_director", nullable = false)
    private Director director;

    @ManyToOne
    @JoinColumn(name = "id_valoracion")
    private Valoracion valoracion;

    @ManyToOne
    @JoinColumn(name = "id_subgenero")
    private SubGenero subGenero;

    // muchas peliculas estan en muchos usuarios
    @ManyToMany(mappedBy = "peliculasFavs")
    private Set<Usuario> usuariosFavorita;
}
