package org.iesbelen.nightmarebox.exception;

public class PeliculaNotFoundException extends RuntimeException {
    public PeliculaNotFoundException(Long id) {
        super("Pelicula " + id + " no encontrada");
    }

    public PeliculaNotFoundException(String titulo) {
        super("Pelicula " + titulo + " no encontrada");
    }
}
