import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private titulo: Title, private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.titulo.setTitle('NigmareBox-Registro')

    this.signUpForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
    });

  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const nuevoUsuario = {
        nombre: this.signUpForm.value.nombre,
        password: this.signUpForm.value.password,
        rolUsuario: 'USUARIO'

      }

      this.authService.signUp(nuevoUsuario).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          // ALERT PERSONALIZADO
          Swal.fire({
            title: 'Registro completado 🩸',
            html: 'Ahora formas parte de <b>la caja de las pesadillas</b>',
            imageUrl: '/favicon.ico',
            imageWidth: 80,
            imageAlt: 'Icono terrorífico',
            background: '#FFFFFF',
            color: '#FF0000',
            confirmButtonColor: '#c40000',
            position: 'top',
            confirmButtonText: 'Inicia sesion para terminar'
          });

        },
        error: (err) => {
          console.error('Error de registro:', err);
        }
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

}
