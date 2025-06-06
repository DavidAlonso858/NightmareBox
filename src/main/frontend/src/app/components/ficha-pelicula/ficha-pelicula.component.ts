import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { Title } from '@angular/platform-browser';
import { PeliculaService } from '../../service/pelicula.service';

@Component({
  selector: 'app-ficha-pelicula',
  imports: [CommonModule, RouterModule],
  templateUrl: './ficha-pelicula.component.html',
  styleUrl: './ficha-pelicula.component.css'
})

export class FichaPeliculaComponent {
  pelicula: Pelicula = {} as Pelicula;
  id: number = 0;
  estrellasLlenas: number[] = [];
  estrellasVacias: number[] = [];

  constructor(private title: Title, private route: ActivatedRoute, private peliculaService: PeliculaService) {
    this.title.setTitle('NightmareBox-Ficha Pelicula');
  }

  ngOnInit() {
    const idParametro = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(idParametro || '0');
    console.log(this.id);

    this.peliculaService.getPeliculaById(this.id).subscribe(peli => {
      this.pelicula = peli;
      this.generarEstrellas();
      console.log(this.pelicula);
    })
  }

  generarEstrellas() {
    const rating = Math.round(this.pelicula.mediaValoracion); // redondeo si viene decimal
    this.estrellasLlenas = Array(rating).fill(0);
    this.estrellasVacias = Array(5 - rating).fill(0);
  }
}


