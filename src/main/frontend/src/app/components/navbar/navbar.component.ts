import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  usuario: any = null;
  nombreUsuario: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      this.nombreUsuario = usuario?.nombre ?? '';
    });

    // Por si refresca la página y hay token pero no usuario cargado aún
    if (this.authService.estaLogueado() && !this.usuario) {
      this.authService.cargarUsuarioDesdeBackend();
    }
  }

  estaLogueado(): boolean {
    return this.authService.estaLogueado();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }
}
