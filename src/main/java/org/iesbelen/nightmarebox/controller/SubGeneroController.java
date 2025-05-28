package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.domain.SubGenero;
import org.iesbelen.nightmarebox.service.PeliculaService;
import org.iesbelen.nightmarebox.service.SubGeneroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/subgenero")
public class SubGeneroController {

    @Autowired
    private SubGeneroService subGeneroService;

    @Autowired
    private PeliculaService peliculaService;

    // OBTENCION
    @GetMapping(value = {"", "/"})
    public List<SubGenero> getSubGenero() {
        log.info("TODAS LOS SUBGENEROS");
        return this.subGeneroService.findAll();
    }

    @GetMapping("/{id}")
    public SubGenero one(@PathVariable Long id) {
        log.info("SUBGENERO CON ID: {}", id);

        return this.subGeneroService.findById(id);
    }

    // CREACION
    @PostMapping(value = {"", "/"})
    public SubGenero newSubGenero(@RequestBody SubGenero subGenero) {
        log.info("SUBGENERO CREADO {}", subGenero);

        return this.subGeneroService.save(subGenero);
    }

    // EDICION
    @PutMapping("/{id}")
    public SubGenero replaceSubGenero(@PathVariable Long id, @RequestBody SubGenero subGenero) {
        log.info("EDITANDO SUBGENERO CON ID: {}", id);

        return this.subGeneroService.replace(subGenero, id);
    }

    // BORRADO
    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteSubGenero(@PathVariable Long id) {
        // Pongo a null las peliculas con ese subgenero que estoy borrando

        SubGenero subGenero = this.subGeneroService.findById(id);
        List<Pelicula> peliculasSubGenero = peliculaService.findBySubGenero(id);

        if (!peliculasSubGenero.isEmpty()) {
            for (Pelicula pelicula : peliculasSubGenero) {
                pelicula.setSubGenero(null);
                peliculaService.save(pelicula);
            }
        }

        log.info("BORRADO SUBGENERO CON ID: {}", id);

        this.subGeneroService.delete(id);
    }
}
