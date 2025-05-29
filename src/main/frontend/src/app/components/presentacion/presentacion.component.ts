import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { SubgeneroService } from '../../service/subgenero.service';
import { SubGenero } from '../../models/subgenero';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../service/pelicula.service';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent {
  @ViewChild('track') track!: ElementRef;

  subgeneroLista: SubGenero[] = [];
  peliculaLista: Pelicula[] = [];
  peliculaListaSubgenero: Pelicula[] = [];


  constructor(private subgenero: SubgeneroService, private pelicula: PeliculaService) {

  }

  ngOnInit(): void {
    this.subgenero.getSubgeneros().subscribe((sub) => {
      this.subgeneroLista = sub;
      console.log(this.subgeneroLista);

    })

    this.pelicula.getPeliculas().subscribe((p) => {
      this.peliculaLista = p;
      console.log(this.peliculaLista);
    })

  }

  filtrarPeliculasPorSubgenero(subgeneroId: number) {
    this.peliculaLista.filter((p) => {

      if (p.subGenero?.id == subgeneroId) {
        this.peliculaListaSubgenero.push(p);
      }
    })
    return this.peliculaListaSubgenero;
  }


  scrollCarrusel(direction: 'left' | 'right') {
    const el = this.track.nativeElement as HTMLElement;
    const scrollAmount = 200;

    if (direction === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
