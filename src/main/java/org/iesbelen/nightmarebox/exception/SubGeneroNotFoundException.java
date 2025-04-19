package org.iesbelen.nightmarebox.exception;


public class SubGeneroNotFoundException extends RuntimeException {
    public SubGeneroNotFoundException(Long id) {
        super("SubGenero " + id + " no encontrado");
    }
    public SubGeneroNotFoundException(String nombre) {
        super("SubGenero " + nombre + " no encontrado");
    }
}
