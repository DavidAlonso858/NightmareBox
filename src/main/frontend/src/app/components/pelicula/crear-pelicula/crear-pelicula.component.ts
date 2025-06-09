import { Component } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';
import { Director } from '../../../models/director';
import { SubGenero } from '../../../models/subgenero';
import { PeliculaService } from '../../../service/pelicula.service';
import { DirectorService } from '../../../service/director.service';
import { SubgeneroService } from '../../../service/subgenero.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {

  peliculaForm: FormGroup;
  
  directores: Director[] = [];
  subgeneros: SubGenero[] = [];
  peliculas: Pelicula[] = [];

  constructor(
    private peliculaService: PeliculaService,
    private directorService: DirectorService,
    private subgeneroService: SubgeneroService,
    private title: Title,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.title.setTitle('Crear Película');

    this.peliculaForm = this.fb.group({
      titulo: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2030)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      sinopsis: [''],
      paises: ['', Validators.required],
      premio: [false],
      poster: [''],
      idDirector: ['', Validators.required],
      idSubGenero: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.directorService.getDirectores().subscribe(directores => {
      this.directores = directores.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });

    this.subgeneroService.getSubgeneros().subscribe(subgeneros => {
      this.subgeneros = subgeneros;
    });

    this.peliculaService.getPeliculas().subscribe(pelis => {
      this.peliculas = pelis;
      console.log(this.peliculas.length);

    });
  }

  crearPelicula() {
    if (this.peliculaForm.valid) {
      const formData = this.peliculaForm.value;

      const nuevaPelicula: Pelicula = {
        titulo: formData.titulo,
        year: formData.year,
        duracion: formData.duracion,
        sinopsis: formData.sinopsis,
        paises: formData.paises.split(',').map((pais: string) => pais.trim()),
        premio: formData.premio,
        poster: formData.poster,
        director: this.directores.find(d => d.id == formData.idDirector)!,
        subGenero: this.subgeneros.find(s => s.id == formData.idSubGenero)!,
        mediaValoracion: 0
      }

      this.peliculaService.addPelicula(nuevaPelicula).subscribe({
        next: (response) => {
          alert('Película creada correctamente');
          this.router.navigate(['/peliculas']);
        },
        error: (error) => {
          console.error('Error al crear la película:', error);
          alert('Error al crear la película. Inténtalo de nuevo.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/peliculas']);
  }
}