package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
// Para que Angular puede hacer peticiones
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/pelicula")
public class PeliculaController {

    @Autowired
    private PeliculaService peliculaService;

    // OBTENCION
    @GetMapping(value = {"", "/"})
    public List<Pelicula> all() {
        log.info("TODAS LAS PELICULAS");
        return this.peliculaService.findAll();
    }

    @GetMapping("/{id}")
    public Pelicula one(@PathVariable Long id) {
        log.info("PELICULA CON ID: {}", id);

        return this.peliculaService.findById(id);
    }

    // CREACION
    @PostMapping(value = {"", "/"})
    public Pelicula newPelicula(@RequestBody Pelicula pelicula) {
        log.info("NUEVA PELICULA: {}", pelicula);
        return this.peliculaService.save(pelicula);
    }

    // EDICION
    @PutMapping("/{id}")
    public Pelicula replacePelicula(@PathVariable Long id, @RequestBody Pelicula pelicula) {
        log.info("EDITANDO PELICULA CON ID: {}", id);

        return this.peliculaService.replace(pelicula, id);
    }

    // BORRADO
    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deletePelicula(@PathVariable Long id) {
        log.info("BORRADO PELICULA CON ID: {}", id);

        this.peliculaService.delete(id);
    }
}
