import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private urlSpring = 'http://localhost:8080/pelicula';


  constructor(private http: HttpClient) { }

  // BACKEND
  getPeliculas() {
    return this.http.get<Pelicula[]>(this.urlSpring);
  }

  addPelicula(pelicula: Pelicula) {
    return this.http.post(this.urlSpring, pelicula);
  }

  deletePelicula(id: number) {
    return this.http.delete(`${this.urlSpring}/${id}`);
  }

  editarPelicula(peli: Pelicula) {
    return this.http.put<Pelicula>(`${this.urlSpring}/editar/${peli.id}`, peli)
  }

  getPeliculaById(id: number) {
    return this.http.get<Pelicula>(`${this.urlSpring}/${id}`);
  }

  getPeliculaBySubgenero(id:number){
    return this.http.get<Pelicula[]>(`${this.urlSpring}/subgenero/${id}`);
  }
}
