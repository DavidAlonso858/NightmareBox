package org.iesbelen.nightmarebox.domain;

import jakarta.persistence.*;
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

    @ManyToMany
    @JoinTable(
            name = "usuarios_peliculas_favoritas",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_pelicula")
    )
    private List<Pelicula> peliculasFavs;
}
