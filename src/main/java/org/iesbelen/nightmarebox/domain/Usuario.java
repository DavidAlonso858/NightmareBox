package org.iesbelen.nightmarebox.domain;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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

    @Column(name = "nombre_usuario", nullable = false)
    @NotBlank
    @Size(min = 3, max = 20)
    private String nombre;

    @Column(name = "password_usuario", nullable = false)
    @NotBlank
    private String password;

    @Enumerated(EnumType.STRING) // el enum personalizado lo guarda como string en la BD
    @Column(name = "rol_usuario", nullable = false)
    private Rol rolUsuario;

    @ManyToMany
    @JoinTable(
            name = "usuario_valoracion",
            joinColumns = @JoinColumn(name = "id_usuario"),
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
