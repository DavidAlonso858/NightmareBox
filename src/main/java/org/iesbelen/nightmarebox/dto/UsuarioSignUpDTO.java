package org.iesbelen.nightmarebox.dto;

import org.iesbelen.nightmarebox.domain.Rol;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioSignUpDTO {

    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    @Size(min = 3, max = 20, message = "El nombre de usuario debe tener entre {min} y {max} caracteres")
    private String nombre;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 5, max = 25, message = "La contraseña debe tener entre {min} y {max} caracteres")
    private String password;

    private Rol rolUsuario;

}
