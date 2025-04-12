package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Year;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pelicula")
    private Long id;

    @Column(name = "titulo_pelicula")
    private String titulo;

    @Column(name = "year_pelicula")
    @JsonFormat(pattern = "yyyy", shape = JsonFormat.Shape.STRING)
    private Year year;

    @Column(name = "duracion_pelicula")
    private Integer duracion;

    @Column(name = "sinopsis_pelicula")
    private String sinopsis;

    @Column(name = "premio_pelicula")
    private Boolean premio;

    @Column(name = "poster_pelicula")
    private String poster;

    @ElementCollection
    private List<String> paises;

    @ManyToOne
    @JoinColumn(name = "id_director", nullable = false)
    private Director director;

    @ManyToOne
    @JoinColumn(name = "id_valoracion")
    private Valoracion valoracion;

    @ManyToMany(mappedBy = "peliculasFavs")
    private List<Usuario> usuariosFavorita;
}
