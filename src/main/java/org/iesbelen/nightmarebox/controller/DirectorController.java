package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.nightmarebox.domain.Director;
import org.iesbelen.nightmarebox.service.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
// Para que Angular puede hacer peticiones
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/director")
public class DirectorController {

    @Autowired
    private DirectorService directorService;

    // OBTENCION
    @GetMapping(value = {"", "/"})
    public List<Director> all() {
        log.info("TODOS LOS DIRECTORES");
        return this.directorService.findAll();
    }

    @GetMapping("/{id}")
    public Director one(@PathVariable Long id) {
        log.info("DIRECTOR CON ID: {}", id);

        return this.directorService.findById(id);
    }

    // CREACION
    @PostMapping(value = {"", "/"})
    public Director newDirector(@RequestBody Director director) {
        log.info("NUEVO DIRECTOR: {}", director);
        return this.directorService.save(director);
    }

    // EDICION
    @PutMapping("/{id}")
    public Director replaceDirector(@PathVariable Long id, @RequestBody Director director) {
        log.info("EDITANDO DIRECTOR CON ID : {}", id);

        return this.directorService.replace(director, id);
    }

    // BORRADO
    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("BORRADO DIRECTOR CON ID : {}", id);

        this.directorService.delete(id);
    }

}
