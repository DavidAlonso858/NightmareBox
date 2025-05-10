package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Year;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // para que las coleccionde Set vayan bien al ser cada id unico
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pelicula")
    @EqualsAndHashCode.Include // para las colecciones de Set
    private Long id;

    @Column(name = "titulo_pelicula", nullable = false)
    @NotBlank
    private String titulo;

    @Column(name = "year_pelicula", nullable = false)
    @JsonFormat(pattern = "yyyy", shape = JsonFormat.Shape.STRING)
    @NotNull // NotBlank es para String
    private Year year;

    @Column(name = "duracion_pelicula", nullable = false)
    @NotNull // NotBlank es para String
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

    @OneToMany(mappedBy = "pelicula")
    @JsonIgnore
    private List<Valoracion> valoraciones;

    @ManyToOne
    @JoinColumn(name = "id_subgenero")
    private SubGenero subGenero;

    // muchas peliculas estan en muchos usuarios
    @ManyToMany(mappedBy = "peliculasFavs")
    @JsonIgnore
    private Set<Usuario> usuariosFavorita;
}
