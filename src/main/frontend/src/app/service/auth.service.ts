import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }


  login(nombre: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { nombre, password }, { responseType: 'text' });
    // responseType: 'text' porque el backend devuelve el token como String
  }

  // REGISTRO
  signUp(usuario: { nombre: string, password: string, rolUsuario?: string }) {
    return this.http.post(`${this.apiUrl}/signUp`, usuario);
  }

  // OBTENER USUARIO DESDE BACKEND USANDO JWT
  cargarUsuarioDesdeBackend() {
    const token = this.obtenerToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1])); // para descodificar el token
    const nombre = payload.sub;

    this.http.get(`${this.apiUrl}/nombre/${nombre}`).subscribe({
      next: (usuario) => this.guardarUsuario(usuario),
      error: (err) => console.error('Error al obtener usuario', err)
    });
  }

  obtenerUsuarioPorNombre() {
    const token = this.obtenerToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1])); // para descodificar el token
    return payload.sub;
  }

  // MÉTODOS DE LOCALSTORAGE
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

  estaLogueado() {
    return !!this.obtenerToken();
  }

  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuario() {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }

  // AGREGAR PELÍCULA A FAVORITOS
  agregarPeliculaFavorita(idPelicula: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.obtenerToken()}`);
    return this.http.put(`${this.apiUrl}/favoritas/${idPelicula}`, {}, { headers });
  }
}
