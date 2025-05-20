import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm: FormGroup;

  constructor(private titulo: Title, private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.titulo.setTitle('NigmareBox-Inicio de sesión')

    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
  if (this.loginForm.valid) {
    const nombre = this.loginForm.value.nombre;
    const password = this.loginForm.value.password;

    this.authService.login(nombre, password).subscribe({
      next: (token) => {
        this.authService.guardarToken(token);
        this.authService.cargarUsuarioDesdeBackend(); // opcional
        this.router.navigate(['']); // redirige a home o lo que quieras
      },
      error: (err) => {
        console.error('Error de login:', err);
        alert('Credenciales incorrectas');
      }
    });
  } else {
    // Marca todos los campos como tocados para que salten las validaciones
    this.loginForm.markAllAsTouched();
  }
}

}
