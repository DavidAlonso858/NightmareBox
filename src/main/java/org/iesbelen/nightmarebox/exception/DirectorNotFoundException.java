package org.iesbelen.nightmarebox.exception;

public class DirectorNotFoundException extends RuntimeException {
    public DirectorNotFoundException(Long id) {
        super("Director " + id + " no encontrado");
    }
}
