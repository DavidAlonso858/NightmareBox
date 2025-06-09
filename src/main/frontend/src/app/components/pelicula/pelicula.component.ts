import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../service/pelicula.service';
import { Title } from '@angular/platform-browser';
import { SubGenero } from '../../models/subgenero';
import { SubgeneroService } from '../../service/subgenero.service';
import { Director } from '../../models/director';
import { DirectorService } from '../../service/director.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})

export class PeliculaComponent {
  usuario: any = null;
  peliculas: Pelicula[] = []
  peliculasFiltradas: Pelicula[] = []

  subgeneros: SubGenero[] = []
  directores: Director[] = []

  subgeneroSeleccionado: number | null = null;
  directorSeleccionado: number | null = null;
  anioInicio: string = '';
  anioFin: string = '';
  conPremio: boolean = false;
  duracionMaxima: number = 200; // de base esta al maximo

  searchTerm: string = '';

  constructor(private peliculaService: PeliculaService, private title: Title, private subgneroService: SubgeneroService,
    private authService: AuthService, private directorService: DirectorService) {
    this.title.setTitle('NightmareBox-Peliculas');
  }

  ngOnInit() {
    this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });

    // Por si refresca la página y hay token pero no usuario cargado aún
    if (this.authService.estaLogueado() && !this.usuario) {
      this.authService.cargarUsuarioDesdeBackend();
    }

    this.peliculaService.getPeliculas().subscribe(data => {
      this.peliculas = data;
      this.peliculasFiltradas = this.peliculas;
      console.log(this.peliculas);

    })

    this.subgneroService.getSubgeneros().subscribe(data => {
      this.subgeneros = data;
    })

    this.directorService.getDirectores().subscribe(data => {
      this.directores = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    })
  }

  obtenerTextoDuracion(): string {
    if (this.duracionMaxima >= 200) {
      return '+200 min';
    } else if (this.duracionMaxima <= 0) {
      return '0 minutos';
    } else {
      return `Hasta ${this.duracionMaxima} min`;
    }
  }

  validarRango(tipo: 'inicio' | 'fin') {
    const min = 1950;
    const max = 2025;

    if (tipo === 'inicio') {
      let valor = parseInt(this.anioInicio, 10);
      if (isNaN(valor)) {
        this.anioInicio = '';
        return;
      }
      if (valor < min) valor = min;
      if (valor > max) valor = max;
      this.anioInicio = valor.toString();
    }

    if (tipo === 'fin') {
      let valor = parseInt(this.anioFin, 10);
      if (isNaN(valor)) {
        this.anioFin = '';
        return;
      }
      if (valor < min) valor = min;
      if (valor > max) valor = max;
      this.anioFin = valor.toString();
    }
  }

  onDuracionChange(): void {
    this.aplicarFiltros();
  }

  busquedaPelicula(): void {
    this.aplicarFiltros();
  }

  // Método unificado para aplicar todos los filtros y saber cuantas se filtran
  aplicarFiltros() {
    console.log('peliculas filtradas', this.peliculasFiltradas.length);
    return this.peliculasFiltradas = this.generalesFiltro();
  }

  generalesFiltro(): Pelicula[] {
    return this.peliculas.filter(peli => {
      const coincideTitulo = this.searchTerm
        ? peli.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const coincideSubgenero = this.subgeneroSeleccionado
        ? peli.subGenero?.id == this.subgeneroSeleccionado
        : true;

      const coincideDirector = this.directorSeleccionado
        ? peli.director?.id == this.directorSeleccionado
        : true;

      const coincideAnioInicio = this.anioInicio
        ? peli.year >= this.anioInicio
        : true;

      const coincideAnioFin = this.anioFin
        ? peli.year <= this.anioFin
        : true;

      const coincidePremio = this.conPremio
        ? peli.premio === true
        : true;

      const coincideDuracion = this.duracionMaxima >= 200
        ? true
        : peli.duracion <= this.duracionMaxima;

      return (
        coincideTitulo &&
        coincideSubgenero &&
        coincideDirector &&
        coincideAnioInicio &&
        coincideAnioFin &&
        coincidePremio &&
        coincideDuracion
      );
    });
  }

  limpiarFiltros(): void {
    this.searchTerm = '';
    this.subgeneroSeleccionado = null;
    this.directorSeleccionado = null;
    this.anioInicio = '';
    this.anioFin = '';
    this.conPremio = false;
    this.duracionMaxima = 200;
    this.aplicarFiltros();
  }

  estaLogueado(): boolean {
    return this.authService.estaLogueado();
  }

  borrarPelicula(id: number) {
    this.peliculaService.deletePelicula(id).subscribe({
      next: (response) => {
        alert('Película borrada correctamente');
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error al borrar la película:', error);
        alert('Error al borrar la película. Inténtalo de nuevo.');
      }
    });
  }

}
