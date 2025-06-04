package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.nightmarebox.domain.Pelicula;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.dto.PeliculaMediaValoracionDTO;
import org.iesbelen.nightmarebox.service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @GetMapping(value = { "", "/" })
    public List<Pelicula> all() {
        log.info("TODAS LAS PELICULAS");
        return this.peliculaService.findAll();
    }

    @GetMapping("/{id}")
    public PeliculaMediaValoracionDTO one(@PathVariable Long id) {
        log.info("PELICULA CON ID: {}", id);

        return this.peliculaService.findById(id);
    }

    @GetMapping("/subgenero/{id}")
    public ResponseEntity<List<Pelicula>> getPeliculasBySubGenero(@PathVariable Long id) {
        List<Pelicula> peliculas = peliculaService.findBySubGenero(id);
        return ResponseEntity.ok(peliculas);
    }

    // CREACION
    @PostMapping(value = { "", "/" })
    public Pelicula newPelicula(@RequestBody Pelicula pelicula) {
        log.info("NUEVA PELICULA: {}", pelicula);
        return this.peliculaService.save(pelicula);
    }

    // EDICION
    @PutMapping("/{id}")
    public ResponseEntity<?> replacePelicula(@PathVariable Long id, @RequestBody Pelicula pelicula) {
        log.info("EDITANDO PELICULA CON ID: {}", id);
        try {
            Pelicula actualizado = peliculaService.replace(pelicula, id);

            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Fallo al editar", HttpStatus.UNAUTHORIZED);
        }
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
