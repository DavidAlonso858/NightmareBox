package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Valoracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_valoracion")
    private Long id;

    @Column(name = "nota_valoracion")
    @Min(0)
    @Max(10)
    private Integer notaValoracion;

    @OneToMany(mappedBy = "valoracion")
    @JsonIgnore
    private List<Pelicula> peliculasValoracion;

    @ManyToMany(
            mappedBy = "valoracionesUsuario")
    @JsonIgnore
    Set<Usuario> usuarios;
}
