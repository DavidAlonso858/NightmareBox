package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
// Para que Angular puede hacer peticiones
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // OBTENCION
    @GetMapping(value = {"", "/"})
    public List<Usuario> all() {
        log.info("TODOS LOS USUARIOS");

        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Usuario one(@PathVariable Long id) {
        log.info("USUARIO CON ID {}", id);

        return usuarioService.findById(id);
    }

    // CREACION
    @PostMapping(value = {"", "/"})
    public Usuario newUsuario(@RequestBody Usuario usuario) {
        log.info("USUARIO CREADO {}", usuario);

        return usuarioService.save(usuario);
    }

    // EDICION
    @PutMapping("/{id}")
    public Usuario replaceUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        log.info("EDITANDO USUARIO CON ID: {}", id);

        return usuarioService.replace(usuario, id);
    }

    // BORRADO
    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("BORRADO USUARIO CON ID {}", id);

        usuarioService.delete(id);
    }
}
