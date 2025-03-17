package org.iesbelen.nightmarebox.exception;

public class UsuarioNotFoundException extends RuntimeException {
    public UsuarioNotFoundException(Long id) {
        super("Usuario " + id + " no encontrado");
    }
}
