import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../service/pelicula.service';

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
  peliculasNumero: number = 0;


  constructor(private authService: AuthService, private router: Router, private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      this.nombreUsuario = usuario?.nombre ?? '';
    });

    // Por si refresca la página y hay token pero no usuario cargado aún
    if (this.authService.estaLogueado() && !this.usuario) {
      this.authService.cargarUsuarioDesdeBackend();
    }

    this.peliculaService.getPeliculas().subscribe(pelis => {
      this.peliculasNumero = pelis.length + 1;
    });
  }

  // para la ficha random sin que salga 0 ni el 26 que lo elimine
  irAPeliculaAleatoria(): void {
    this.peliculaService.getPeliculas().subscribe(pelis => {
      const pelisValidas = pelis.filter(p => p.id !== 26);
      const randomIndex = Math.floor(Math.random() * pelisValidas.length);
      const randomId = pelisValidas[randomIndex].id;

      // Fuerza la navegación a la misma ruta para que se recargue
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/pelicula', randomId]);
      });
    });
  }



  estaLogueado(): boolean {
    return this.authService.estaLogueado();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
