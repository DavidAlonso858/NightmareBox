package org.iesbelen.nightmarebox.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(name = "nombre_usuario", nullable = false) // validaciones en el dto
    private String nombre;

    @Column(name = "password_usuario", nullable = false) // validaciones en el dto por la contra hasheada
    private String password;

    @Enumerated(EnumType.STRING) // el enum personalizado lo guarda como string en la BD
    @Column(name = "rol_usuario", nullable = false)
    private Rol rolUsuario;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private List<Valoracion> valoraciones;

    // muchos usuarios estan en muchas peliculas
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "usuarios_peliculas_favoritas",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_pelicula")
    )
    private Set<Pelicula> peliculasFavs;
}
