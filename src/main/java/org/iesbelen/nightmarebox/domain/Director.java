package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Director {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_director")
    private Long id;

    @Column(name = "nombre_director")
    private String nombre;

    @Column(name = "edad_director")
    private Integer edad;

    @Column(name = "poster_director")
    private String poster;

    @ElementCollection
    private List<String> paises;

    @OneToMany(mappedBy = "director")
    @JsonIgnore
    private List<Pelicula> peliculasDirector;
}
