package org.iesbelen.nightmarebox.domain;

import jakarta.persistence.*;
<<<<<<< HEAD
import jakarta.validation.constraints.Size;
=======
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
>>>>>>> 2a9c4851 (cambios de list por set + inicio seguridad con token)
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
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
    @Column(name = "nombre_usuario")
<<<<<<< HEAD
    @Size(min = 3, max = 20)
=======
    @Min(3)
    @Max(20)
>>>>>>> 2a9c4851 (cambios de list por set + inicio seguridad con token)
    private String nombre;

    @Column(name = "password_usuario")
    private String password;

    @Column(name = "rol_usuario")
    private Enum<Rol> rolUsuario;

    @ManyToMany
    @JoinTable(
            name = "usuario_valoracion", // nombre de la tabla
            joinColumns = @JoinColumn(name = "id_usuario"), // name tabla intermedia // referenced el de la principal
            inverseJoinColumns = @JoinColumn(name = "id_valoracion"))
    List<Valoracion> valoracionesUsuario = new ArrayList<>();

    // muchos usuarios estan en muchas peliculas
    @ManyToMany
    @JoinTable(
            name = "usuarios_peliculas_favoritas",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_pelicula")
    )
    private Set<Pelicula> peliculasFavs;
}
