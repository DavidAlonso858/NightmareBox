import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario';

  // PARA QUE SE VEA REACTIVAMENTE EN EL NAVBAR
  private usuarioSubject = new BehaviorSubject<any>(this.obtenerUsuario());
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  
getNombre(nombre: string | null) {
    return this.http.get<Usuario>(`${this.apiUrl}/nombre/${nombre}`);
}

  borradoUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  login(nombre: string, password: string) {
    // responseType: 'text' porque el backend devuelve el token como String
    return this.http.post(`${this.apiUrl}/login`, { nombre, password }, { responseType: 'text' });
  }

  // REGISTRO
  signUp(usuario: { nombre: string, password: string, rolUsuario?: string }) {
    return this.http.post(`${this.apiUrl}/signUp`, usuario);
  }

  cargarUsuarioDesdeBackend() {
    const token = this.obtenerToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1])); // para descodificar el token
    const nombre = payload.sub;

    this.http.get(`${this.apiUrl}/nombre/${nombre}`).subscribe({
      next: (usuario) => {
        this.guardarUsuario(usuario);
        this.usuarioSubject.next(usuario); // notificar a los que están suscritos
      },
      error: (err) => console.error('Error al obtener usuario', err)
    });
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
    this.usuarioSubject.next(null); // notificar logout
  }

  estaLogueado() {
    return !!this.obtenerToken();
  }

  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario); // notificar cambio
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
