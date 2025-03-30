import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private url = 'http://localhost:3000/almacenPeliculas';

  constructor(private http: HttpClient) { }


  getPeliculas() {
    return this.http.get<Pelicula[]>(this.url);
  }

  addPelicula(pelicula: Pelicula) {
    return this.http.post(this.url, pelicula);
  }

  deletePelicula(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  editarPelicula(peli: Pelicula) {
    return this.http.put<Pelicula>(`${this.url}/${peli.id}`, peli)
  }

  getPeliculaById(id: string) {
    return this.http.get<Pelicula>(`${this.url}/${id}`);
  }
}
