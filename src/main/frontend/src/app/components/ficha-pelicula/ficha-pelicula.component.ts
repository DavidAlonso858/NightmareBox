import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { Title } from '@angular/platform-browser';
import { PeliculaService } from '../../service/pelicula.service';
import { AuthService } from '../../service/auth.service';
import { ValoracionService } from '../../service/valoracion.service';
import { Valoracion } from '../../models/valoracion';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PeliculaComponent } from '../pelicula/pelicula.component';

@Component({
  selector: 'app-ficha-pelicula',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ficha-pelicula.component.html',
  styleUrl: './ficha-pelicula.component.css'
})

export class FichaPeliculaComponent {
  pelicula: Pelicula = {} as Pelicula;
  id: number = 0;

  estrellasLlenas: number[] = [];
  estrellasVacias: number[] = [];

  notas: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // [1,2,3...10]
  valoracionSeleccionada: number = 0;
  valoracionExistente: Valoracion | null = null;

  esFavorita: boolean = false;
  cargandoFavorito: boolean = false;

  constructor(private title: Title, private route: ActivatedRoute, private peliculaService: PeliculaService,
    private authService: AuthService, private valoracionService: ValoracionService) {
    this.title.setTitle('NightmareBox-Ficha Pelicula');
  }

  ngOnInit() {
    const idParametro = this.route.snapshot.paramMap.get('id');
    console.log(idParametro);
    
    this.id = parseInt(idParametro || '0');
    window.scrollTo(0, 0);

    this.peliculaService.getPeliculaById(this.id).subscribe(peli => {
      this.pelicula = peli;
      this.generarEstrellas();

      const usuario = this.authService.obtenerUsuario();
      if (usuario) {
        this.verificarSiEsFavorita();

        // Buscar si ya hay valoración del usuario para esta película
        this.valoracionService
          .getValoracionDeUsuarioParaPelicula(usuario.id, this.pelicula.id!)
          .subscribe({
            next: (valoracion) => {
              this.valoracionExistente = valoracion;
              this.valoracionSeleccionada = valoracion.notaValoracion;
            },
            error: (err) => {
              console.log("No hay valoración previa para esta película por el usuario", err);
            }
          });
      }
    });
  }

  generarEstrellas() {
    const rating = Math.round(this.pelicula.mediaValoracion);
    const maxEstrellas = 10;

    this.estrellasLlenas = Array(rating).fill(0); // las de la nota
    this.estrellasVacias = Array(maxEstrellas - rating).fill(0); // las vacias que faltan para llegar a 10
  }

  estaLogueado(): boolean {
    return this.authService.estaLogueado();
  }

  enviarValoracion() {
    const usuarioLog = this.authService.obtenerUsuario();

    if (!usuarioLog || !this.pelicula || this.valoracionSeleccionada === 0) {
      alert("Faltan datos para enviar la valoración.");
      return;
    }

    const valoracion: Valoracion = {
      notaValoracion: this.valoracionSeleccionada,
      usuario: usuarioLog,
      pelicula: this.pelicula
    };

    // Solo añadir el id si es una edición
    if (this.valoracionExistente) {
      valoracion.id = this.valoracionExistente.id;
    }

    const accion = this.valoracionExistente
      ? this.valoracionService.editarValoracion(valoracion)
      : this.valoracionService.addValoracion(valoracion);

    accion.subscribe({
      next: () => {
        Swal.fire({
          title: this.valoracionExistente ? '🕸️Valoración actualizada 🕸️' : '🕷️ Gracias por su valoración 🕷️',
          background: '#000000',
          color: '#FF0000',
          position: 'top',
        });

        this.peliculaService.getPeliculaById(this.pelicula.id!).subscribe(peli => {
          this.pelicula = peli;
          this.generarEstrellas();
        });

        this.valoracionExistente = valoracion; // marcar como existente para futuras ediciones
      },
      error: err => {
        console.error("Error al enviar/editar valoración:", err);
        alert("No se pudo enviar la valoración.");
      }
    });
  }

  verificarSiEsFavorita() {
    const usuario = this.authService.obtenerUsuario();
    if (usuario && usuario.peliculasFavs && this.pelicula.id) {
      this.esFavorita = usuario.peliculasFavs.some((peli: Pelicula) => peli.id === this.pelicula.id);
    }
  }

  manejoFavorito() {
    if (this.cargandoFavorito) return;

    this.cargandoFavorito = true;

    if (this.esFavorita) {
      this.quitarDeFavoritos();
    } else {
      this.agregarAFavoritos();
    }
  }

  agregarAFavoritos() {
    this.authService.agregarPeliculaFavorita(this.pelicula.id!).subscribe({
      next: () => {
        this.esFavorita = true;
        this.cargandoFavorito = false;

        // Recargar el usuario desde el backend para tener los datos actualizados
        this.authService.cargarUsuarioDesdeBackend();

        Swal.fire({
          title: '¡Añadida a favoritos!',
          text: `${this.pelicula.titulo} se ha agregado a tu lista de favoritos`,
          icon: 'success',
          background: '#000000',
          color: '#FF0000',
          position: 'top',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.cargandoFavorito = false;
        console.error('Error al agregar a favoritos:', err);

        Swal.fire({
          title: 'Error',
          text: 'No se pudo agregar la película a favoritos',
          icon: 'error',
          background: '#000000',
          color: '#FF0000',
          position: 'top'
        });
      }
    });
  }

  quitarDeFavoritos() {
    this.authService.quitarPeliculaFavorita(this.pelicula.id!).subscribe({
      next: () => {
        this.esFavorita = false;
        this.cargandoFavorito = false;

        // Recargar el usuario desde el backend para tener los datos actualizados
        this.authService.cargarUsuarioDesdeBackend();

        Swal.fire({
          title: '¡Quitada de favoritos!',
          text: `${this.pelicula.titulo} se ha eliminado de tu lista de favoritos`,
          icon: 'info',
          background: '#000000',
          color: '#FF0000',
          position: 'top',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.cargandoFavorito = false;
        console.error('Error al quitar de favoritos:', err);

        Swal.fire({
          title: 'Error',
          text: 'No se pudo quitar la película de favoritos',
          icon: 'error',
          background: '#000000',
          color: '#FF0000',
          position: 'top'
        });
      }
    });

  }
}


