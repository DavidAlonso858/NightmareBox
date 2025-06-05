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

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})

export class PeliculaComponent {
  peliculas: Pelicula[] = []
  peliculasFiltradas: Pelicula[] = []

  subgeneros: SubGenero[] = []
  directores: Director[] = []


  subgeneroSeleccionado: number | null = null;
  directorSeleccionado: number | null = null;
  anioInicio: string = '';
  anioFin: string = '';
  conPremio: boolean = false;

  searchTerm: string = '';

  constructor(private peliculaService: PeliculaService, private title: Title, private subgneroService: SubgeneroService, private directorService: DirectorService) {
    this.title.setTitle('NightmareBox-Peliculas');
  }

  ngOnInit() {
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

      return (
        coincideTitulo &&
        coincideSubgenero &&
        coincideDirector &&
        coincideAnioInicio &&
        coincideAnioFin &&
        coincidePremio
      );
    });
  }


  // BUSQUEDA
  busquedaPelicula(): void {
    this.peliculasFiltradas = this.peliculas.filter(peli =>
      peli.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
