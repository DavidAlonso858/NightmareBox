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

  constructor(private title: Title, private route: ActivatedRoute, private peliculaService: PeliculaService,
    private authService: AuthService, private valoracionService: ValoracionService) {
    this.title.setTitle('NightmareBox-Ficha Pelicula');
  }

  ngOnInit() {
    const idParametro = this.route.snapshot.paramMap.get('id');
    window.scrollTo(0, 0); // para que vaya al principio del componente aunque en otro este abajo

    this.id = parseInt(idParametro || '0');
    console.log(this.id);

    this.peliculaService.getPeliculaById(this.id).subscribe(peli => {
      this.pelicula = peli;
      this.generarEstrellas();
      console.log(this.pelicula);
    })
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
    const valoracion: Valoracion = {
      notaValoracion: this.valoracionSeleccionada,
      usuario: usuarioLog,
      pelicula: this.pelicula
    };

    this.valoracionService.addValoracion(valoracion).subscribe({
      next: () => {
        Swal.fire({
          title: '🕸️ Gracias por tu valoración! 🕸️',
          background: '#000000',
          color: '#FF0000',
          position: 'top',
        })
        this.peliculaService.getPeliculaById(this.pelicula.id).subscribe(peli => {
          this.pelicula = peli;
          this.generarEstrellas(); // actualiza la media visual
        });
      },
      error: err => {
        console.error("Error al enviar valoración:", err);
        alert("No se pudo enviar la valoración.");
      }
    });
  }
}


