import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Title } from '@angular/platform-browser';

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
      nombre: ['', Validators.required],
      password: ['', Validators.required]
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
          alert('Registro correcto. Inicie sesión con sus credenciales.');
        },
        error: (err) => {
          console.error('Error de registro:', err);
          alert('Credenciales incorrectas');
        }
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

}
