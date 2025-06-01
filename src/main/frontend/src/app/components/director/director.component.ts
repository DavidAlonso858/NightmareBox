import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Director } from '../../models/director';
import { DirectorService } from '../../service/director.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../service/pelicula.service';
import { log } from 'console';

@Component({
  selector: 'app-director',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './director.component.html',
  styleUrl: './director.component.css'
})

export class DirectorComponent {

  directores: Director[] = [];
  directoresGenerales: Director[] = [];
  peliculasDirector: Pelicula[] = [];
  peliculas: Pelicula[] = [];

  constructor(private title: Title, private directorService: DirectorService, private peliculaService: PeliculaService) {
    this.title.setTitle('NightmareBox - Directores');
  }

  ngOnInit(): void {
    this.directorService.getDirectores().subscribe(directores => {
      this.directores = directores;
    });

    this.peliculaService.getPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
    });

  }


  // la lista de directores sin los destacados includidos
  genralesFiltro() {
    this.directoresGenerales = this.directores.filter(d => ![1, 3, 9, 23, 13, 19].includes(d.id))
    console.log(this.directoresGenerales);

    // ordenados alfabeticamente
    return this.directoresGenerales.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }


  listaPeliculasDirector(id: number) {
    const director = this.directores.find(d => d.id === id);

    if (director) {
      this.peliculasDirector = this.peliculas.filter(p => p.director?.id === director.id);
    }

    return this.peliculasDirector;
  }

}
