import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuario: any;

  constructor(private authService: AuthService) {
    this.usuario = this.authService.obtenerUsuario();

    if (!this.usuario && this.authService.estaLogueado()) {
      this.authService.cargarUsuarioDesdeBackend();

      // Espera un poco para que se guarde en localStorage
      setTimeout(() => {
        this.usuario = this.authService.obtenerUsuario();
      }, 500);
    }
  }

  estaLogueado(): boolean {
    return this.authService.estaLogueado();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    window.location.reload();
  }
}