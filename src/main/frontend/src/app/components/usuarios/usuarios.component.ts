import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../service/auth.service';
import { Rol } from '../../models/rol';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent {

  usuarios: Usuario[] = []
  roles: string[] = Object.values(Rol);

  constructor(private usuariosService: AuthService) {
  }

  ngOnInit(): void {

    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data
    })

  }

  cambiarRol(usuario: Usuario): void {
    this.usuariosService.actualizarUsuario(usuario).subscribe({
      next: (res) => {
        console.log('Rol actualizado con éxito:', res);
      },
      error: (err) => {
        console.error('Error al actualizar rol', err);
      }
    });
  }

}


