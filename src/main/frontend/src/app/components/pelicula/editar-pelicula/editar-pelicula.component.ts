import { Component } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';
import { Director } from '../../../models/director';
import { PeliculaService } from '../../../service/pelicula.service';
import { DirectorService } from '../../../service/director.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { SubGenero } from '../../../models/subgenero';
import { SubgeneroService } from '../../../service/subgenero.service';

@Component({
  selector: 'app-editar-pelicula',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})

export class EditarPeliculaComponent {

  pelicula: Pelicula = {} as Pelicula;
  directores: Director[] = [];
  subgeneros: SubGenero[] = [];
  peliculaId: number = 0;

  peliculaForm: FormGroup;

  constructor(private peliculaService: PeliculaService, private directorService: DirectorService,
    private title: Title, private fb: FormBuilder,
    private subgeneroService: SubgeneroService, private route: ActivatedRoute, private router: Router) {

    this.title.setTitle("Editar Pelicula");

    this.peliculaForm = this.fb.group({
      titulo: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2030)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      sinopsis: [''],
      paises: ['', Validators.required],
      premio: [false],
      poster: [''],
      idSubGenero: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.peliculaId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.peliculaId);
    
    this.directorService.getDirectores().subscribe(directores => {
      this.directores = directores;
    });

    this.subgeneroService.getSubgeneros().subscribe(subgeneros => {
      this.subgeneros = subgeneros;
    });

    if (this.peliculaId) {
      this.peliculaService.getPeliculaById(this.peliculaId).subscribe((pelicula) => {
        this.peliculaForm.patchValue({
          titulo: pelicula.titulo,
          year: pelicula.year,
          duracion: pelicula.duracion,
          sinopsis: pelicula.sinopsis || '',
          paises: pelicula.paises ? pelicula.paises.join(', ') : '',
          premio: pelicula.premio || false,
          poster: pelicula.poster || '',
          idSubGenero: pelicula.subGenero ? pelicula.subGenero.id : ''
        });
      });
    }
  }

  onSubmit() {
    if (this.peliculaForm.valid) {
      const formData = this.peliculaForm.value;

      const peliculaActualizada: Pelicula = {
        id: this.peliculaId,
        titulo: formData.titulo,
        year: formData.year,
        duracion: formData.duracion,
        sinopsis: formData.sinopsis,
        paises: formData.paises.split(',').map((pais: string) => pais.trim()),
        premio: formData.premio,
        poster: formData.poster,
        director: this.directores.find(d => d.id == formData.idDirector)!,
        subGenero: this.subgeneros.find(s => s.id == formData.idSubGenero)!,
        mediaValoracion: this.pelicula.mediaValoracion,
      };

      this.peliculaService.editarPelicula(peliculaActualizada).subscribe({
        next: (response) => {
          alert('Película actualizada correctamente');
          this.router.navigate(['/peliculas']);
        },
        error: (error) => {
          console.error('Error al actualizar la película:', error);
          alert('Error al actualizar la película. Inténtalo de nuevo.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/peliculas']);
  }
}


