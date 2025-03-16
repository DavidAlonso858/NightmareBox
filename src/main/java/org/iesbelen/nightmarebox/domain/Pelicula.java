package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Year;
import java.util.List;
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

    @Column(name = "titulo_pelicula")
    private String titulo;

    @Column(name = "year_pelicula")
    @JsonFormat(pattern = "yyyy", shape = JsonFormat.Shape.STRING)
    private Year year;

    @Column(name = "duracion_pelicula")
    private Integer duracion;

    @Column(name = "sipnosis_pelicula")
    private String sipnosis;

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
    @JoinColumn(name = "id_valoracion", nullable = false)
    private Valoracion valoracion;


}
