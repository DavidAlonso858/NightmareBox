package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private AuthenticationManager authenticationManager;

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
    @PostMapping("/signUp")
    public Usuario newUsuario(@RequestBody Usuario usuario) {
        log.info("USUARIO CREADO {}", usuario);

        return usuarioService.save(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Usuario usuario) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(usuario.getNombre(), usuario.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtToken = usuarioService.generateToken(userDetails);

            return ResponseEntity.ok(jwtToken);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Credenciales inválidas", HttpStatus.UNAUTHORIZED);
        }
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
