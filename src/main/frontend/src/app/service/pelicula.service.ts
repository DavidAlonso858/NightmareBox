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
  getPeliculas2() {
    return this.http.get<Pelicula[]>(this.urlSpring);
  }

  addPelicula2(pelicula: Pelicula) {
    return this.http.post(this.urlSpring, pelicula);
  }

  deletePelicula2(id: number) {
    return this.http.delete(`${this.urlSpring}/${id}`);
  }

  editarPelicula2(peli: Pelicula) {
    return this.http.put<Pelicula>(`${this.urlSpring}/${peli.id}`, peli)
  }

  getPeliculaById2(id: number) {
    return this.http.get<Pelicula>(`${this.urlSpring}/${id}`);
  }
}
