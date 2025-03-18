package org.iesbelen.nightmarebox.service;

import org.iesbelen.nightmarebox.domain.Usuario;
import org.iesbelen.nightmarebox.exception.UsuarioNotFoundException;
import org.iesbelen.nightmarebox.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario replace(Usuario usuario, Long id) {
        return usuarioRepository.findById(id)
                .map(u -> (id.equals(usuario.getId()) ? usuarioRepository.save(usuario) : null))
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    public void delete(Long id) {
        usuarioRepository.deleteById(id);

    }
}
