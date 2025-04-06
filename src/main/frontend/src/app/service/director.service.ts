import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private urlJson = 'http://localhost:3001/almacenDirectores';
  private urlSpring = 'http://localhost:8080/director';

  constructor(private http: HttpClient) { }


  getDirectores() {
    return this.http.get<Director[]>(this.urlJson);
  }

  addPelicula(dire: Director) {
    return this.http.post(this.urlJson, dire);
  }

  deleteDirector(id: number) {
    return this.http.delete(`${this.urlJson}/${id}`);
  }

  editarDirector(dire: Director) {
    return this.http.put<Director>(`${this.urlJson}/${dire.id}`, dire)
  }

  getDirectorById(id: number) {
    return this.http.get<Director>(`${this.urlJson}/${id}`);
  }

  // BACKEND
  getDirectores2() {
    return this.http.get<Director[]>(this.urlSpring);
  }

  addDirector2(dire: Director) {
    return this.http.post(this.urlSpring, dire);
  }

  deleteDirector2(id: number) {
    return this.http.delete(`${this.urlSpring}/${id}`);
  }

  editarDirector2(dire: Director) {
    return this.http.put<Director>(`${this.urlSpring}/${dire.id}`, dire)
  }

  getDirectorById2(id: number) {
    return this.http.get<Director>(`${this.urlSpring}/${id}`);
  }
}
