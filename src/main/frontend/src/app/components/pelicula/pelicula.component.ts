import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../service/pelicula.service';
import { Title } from '@angular/platform-browser';

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

  searchTerm: string = '';

  constructor(private peliculaService: PeliculaService, private title: Title) {
    this.title.setTitle('NightmareBox-Peliculas');
  }

  ngOnInit() {

    this.peliculaService.getPeliculas().subscribe(data => {
      this.peliculas = data;
    })

  }

  // BUSQUEDA
  onSearchChange(): void {
    this.peliculasFiltradas = this.peliculas.filter(peli =>
      peli.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
