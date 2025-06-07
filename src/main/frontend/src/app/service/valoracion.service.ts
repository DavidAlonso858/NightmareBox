import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Valoracion } from '../models/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  private urlSpring = 'http://localhost:8080/valoracion';

  constructor(private http: HttpClient) { }

  getValoraciones() {
    return this.http.get<Valoracion[]>(this.urlSpring);
  }

  getValoracionById() {
    return this.http.get<Valoracion>(this.urlSpring)
  }

  addValoracion(val: Valoracion) {
    return this.http.post(this.urlSpring, val);
  }

  deleteValoracion(id: number) {
    return this.http.delete(`${this.urlSpring}/${id}`);
  }

  editarValoracion(val: Valoracion) {
    return this.http.put(`${this.urlSpring}/${val.id}`, val);
  }

  getValoracionDeUsuarioParaPelicula(idUsuario: number, idPelicula: number) {
    return this.http.get<Valoracion>(`${this.urlSpring}/usuario/${idUsuario}/pelicula/${idPelicula}`);
  }

}
