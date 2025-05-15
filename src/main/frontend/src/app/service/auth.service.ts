import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario'; // ajusta según el backend

  constructor(private http: HttpClient) {}

  login(nombre: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { nombre, password });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  estaLogueado(): boolean {
    return !!this.obtenerToken();
  }

  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuario(): any {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }

  cargarUsuarioDesdeBackend() {
    const token = this.obtenerToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const nombre = payload.sub;

    this.http.get(`${this.apiUrl}/nombre/${nombre}`).subscribe({
      next: (usuario) => this.guardarUsuario(usuario),
      error: (err) => console.error('Error al obtener usuario', err)
    });
  }
}
