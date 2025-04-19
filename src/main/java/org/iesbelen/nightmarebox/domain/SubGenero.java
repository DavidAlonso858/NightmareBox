package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "subgenero")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubGenero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_subgenero")
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "subGenero")
    @JsonIgnore
    private Set<Pelicula> peliculas;
}
