package org.iesbelen.nightmarebox.controller;

import lombok.extern.slf4j.Slf4j;

import org.iesbelen.nightmarebox.domain.Rol;
import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.dto.PeliculaMediaValoracionDTO;
import org.iesbelen.nightmarebox.dto.UsuarioSignUpDTO;
import org.iesbelen.nightmarebox.service.PeliculaService;
import org.iesbelen.nightmarebox.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

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
    private PeliculaService peliculaService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // OBTENCION
    @GetMapping(value = { "", "/" })
    public List<Usuario> all() {
        log.info("TODOS LOS USUARIOS");

        return usuarioService.findAll();
    }

    @GetMapping("/id/{id}")
    public Usuario one(@PathVariable Long id) {
        log.info("USUARIO CON ID {}", id);
        return usuarioService.findById(id);
    }

    @GetMapping("/nombre/{nombre}") // Changed path
    public ResponseEntity<Usuario> getByNombre(@PathVariable String nombre) {
        Usuario usuario = usuarioService.findByNombre(nombre);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/favoritas/{nombre}")
    public ResponseEntity<List<PeliculaMediaValoracionDTO>> obtenerFavoritasConMedia(@PathVariable String nombre) {
        Usuario usuario = usuarioService.findByNombre(nombre);

        List<PeliculaMediaValoracionDTO> favoritasDTO = usuario.getPeliculasFavs()
                .stream()
                .map(pelicula -> peliculaService.convertirAPeliculaDTO(pelicula))
                .toList();

        return ResponseEntity.ok(favoritasDTO);
    }

    @GetMapping("/usuario/perfil")
    public ResponseEntity<Usuario> obtenerPerfil(Authentication authentication) {
        try {
            String username = authentication.getName();
            Usuario usuario = usuarioService.findByNombre(username);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // CREACION
    @PostMapping("/signUp")
    public Usuario newUsuario(@RequestBody @Valid UsuarioSignUpDTO usuarioDTO) {
        log.info("Registro DTO para usuario: {}", usuarioDTO.getNombre());

        Usuario nuevoUsuario = new Usuario();

        nuevoUsuario.setNombre(usuarioDTO.getNombre());
        nuevoUsuario.setPassword(usuarioDTO.getPassword());

        if (usuarioDTO.getRolUsuario() != null) {
            nuevoUsuario.setRolUsuario(usuarioDTO.getRolUsuario());
        } else {
            nuevoUsuario.setRolUsuario(Rol.USUARIO);
        }

        return usuarioService.save(nuevoUsuario);

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Usuario usuario) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(usuario.getNombre(), usuario.getPassword()));
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
    public Usuario replaceUsuario(@PathVariable Long id, @RequestBody @Valid Usuario usuario) {
        log.info("EDITANDO USUARIO CON ID: {}", id);

        return usuarioService.replace(usuario, id);
    }

    // AGREGADO PELICULAS FAVS
    @PutMapping("/favoritas/{idPelicula}")
    public ResponseEntity<?> agregarPeliculaFavorita(@PathVariable Long idPelicula, Authentication authentication) {

        try {
            String username = authentication.getName(); // el username del JWT
            Usuario usuario = usuarioService.findByNombre(username);
            Usuario actualizado = usuarioService.agregarPelicula(idPelicula, usuario.getId());

            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Fallo al agregar la peli fav", HttpStatus.UNAUTHORIZED);
        }
    }

    // BORRADO
    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("BORRADO USUARIO CON ID {}", id);

        usuarioService.delete(id);
    }

    // BORRADO DE PELICULAS FAVS
    @DeleteMapping("/favoritas/{idPelicula}")
    public ResponseEntity<?> quitarPeliculaFavorita(@PathVariable Long idPelicula, Authentication authentication) {
        try {
            String username = authentication.getName();
            Usuario usuario = usuarioService.findByNombre(username);
            Usuario actualizado = usuarioService.quitarPelicula(idPelicula, usuario.getId());

            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Fallo al quitar la peli fav", HttpStatus.UNAUTHORIZED);
        }
    }
}
