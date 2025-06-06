package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.nightmarebox.domain.Valoracion;
import org.iesbelen.nightmarebox.service.ValoracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/valoracion")
public class ValoracionController {

    @Autowired
    private ValoracionService valoracionService;

    // OBTENCION
    @GetMapping(value = { "/", "" })
    public List<Valoracion> all() {
        log.info("TODAS LAS VALORACIONES");
        return valoracionService.findAll();
    }

    @GetMapping("/{id}")
    public Valoracion one(@PathVariable Long id) {

        log.info("VALORACION CON ID: {}", id);
        return valoracionService.findById(id);
    }

    @GetMapping("/usuario/{idUsuario}/pelicula/{idPelicula}")
    public ResponseEntity<Valoracion> getValoracionPorUsuarioYPelicula(
            @PathVariable Long idUsuario,
            @PathVariable Long idPelicula) {

        log.info("BUSCANDO VALORACION de usuario {} para pelicula {}", idUsuario, idPelicula);

        Valoracion valoracion = valoracionService.findByUsuarioAndPelicula(idUsuario, idPelicula);
        if (valoracion != null) {
            return ResponseEntity.ok(valoracion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // CREACION
    @PostMapping(value = { "", "/" })
    public Valoracion newValoracion(@RequestBody Valoracion valoracion) {
        log.info("VALORACION CREADA: {}", valoracion);

        return this.valoracionService.save(valoracion);
    }

    // EDICION
    @PutMapping("/{id}")
    public Valoracion replaceValoracion(@PathVariable Long id, @RequestBody Valoracion valoracion) {

        log.info("EDITANDO VALORACION CON ID: {}", id);

        return this.valoracionService.replace(valoracion, id);
    }

    // BORRADO
    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteValoracion(@PathVariable Long id) {
        log.info("BORRADO VALORACION CON ID: {}", id);

        valoracionService.delete(id);
    }
}
