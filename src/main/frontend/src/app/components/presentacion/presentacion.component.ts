import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { SubgeneroService } from '../../service/subgenero.service';
import { SubGenero } from '../../models/subgenero';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../service/pelicula.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})

export class PresentacionComponent {
  @ViewChild('track4') track4 !: ElementRef;
  @ViewChild('track0') track0 !: ElementRef;
  @ViewChild('track1') track1 !: ElementRef;
  @ViewChild('track2') track2 !: ElementRef;
  @ViewChild('track3') track3 !: ElementRef;
  @ViewChild('track5') track5 !: ElementRef;

  subgeneroLista: SubGenero[] = [];
  peliculaLista: Pelicula[] = [];

  constructor(private title: Title, private subgenero: SubgeneroService, private pelicula: PeliculaService) {
    this.title.setTitle('NightmareBox')
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
    const peliculasSubgenero = this.peliculaLista.filter(p => p.subGenero?.id == subgeneroId)
    return [...peliculasSubgenero, ...peliculasSubgenero]; // duplico para que funcione siempre el efecto de carrousel
  }

  // le paso la direccion predefinida y el elemento del carrousel-track
  scrollCarrusel(direction: 'left' | 'right', track: HTMLElement) {
    const scrollAmount = 300; // 300 pixeles al moverse
    track.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount });

    // vuelve al principio cuando estoy al fina del duplicado
    setTimeout(() => {
      if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10) {
        track.scrollTo({ left: 0, behavior: 'auto' }); // Salto sin animación
      }
    }, 300);
  }
}
