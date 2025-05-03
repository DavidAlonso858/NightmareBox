package org.iesbelen.nightmarebox.exception;

public class ValoracionNotFoundException extends RuntimeException {
    public ValoracionNotFoundException(Long id) {
        super("Valoracion no encontrada: " + id);
    }
}
