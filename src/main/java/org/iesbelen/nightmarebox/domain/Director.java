package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // para que las coleccionde Set vayan bien al ser cada id unico
public class Director {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_director")
    @EqualsAndHashCode.Include // para las colecciones de Set
    private Long id;

    @Column(name = "nombre_director", nullable = false)
    @NotBlank
    private String nombre;

    @Column(name = "edad_director", nullable = false)
    @NotBlank
    private Integer edad;

    @Column(name = "poster_director")
    private String poster;

    @ElementCollection
    private Set<String> paises;

    @OneToMany(mappedBy = "director")
    @JsonIgnore
    private Set<Pelicula> peliculasDirector;
}
