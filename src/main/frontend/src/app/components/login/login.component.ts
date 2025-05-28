import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone:true,
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
    const { nombre, password } = this.loginForm.value;

    this.authService.login(nombre, password).subscribe({
      next: (token) => {
        this.authService.guardarToken(token);
        this.authService.cargarUsuarioDesdeBackend(); // ACTUALIZA EL BehaviorSubject PARA MOSTRAR EL NOMBRE
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        alert('Credenciales incorrectas');
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}


}
