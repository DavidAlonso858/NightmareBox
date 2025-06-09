import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DirectorService } from '../../../service/director.service';
import { Director } from '../../../models/director';

@Component({
  selector: 'app-crear-director',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-director.component.html',
  styleUrl: './crear-director.component.css'
})
export class CrearDirectorComponent implements OnInit {

  directorForm: FormGroup;
  directores: Director[] = [];

  constructor(
    private directorService: DirectorService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Crear Director');

    this.directorForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      poster: [''],
      paises: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.directorService.getDirectores().subscribe((directores) => {
      this.directores = directores;
    });
  }

  crearDirector(): void {
    if (this.directorForm.valid) {
      const formData = this.directorForm.value;

      const nuevoDirector: Director = {
        nombre: formData.nombre,
        edad: formData.edad,
        poster: formData.poster,
        paises: formData.paises.split(',').map((p: string) => p.trim())
      };

      this.directorService.addDirector(nuevoDirector).subscribe({
        next: () => {
          alert('Director creado correctamente');
          this.router.navigate(['/directores']);
        },
        error: (error) => {
          console.error('Error al crear el director:', error);
          alert('Hubo un error al crear el director');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/directores']);
  }
}
