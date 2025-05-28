import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubGenero } from '../models/subgenero';

@Injectable({
  providedIn: 'root'
})
export class SubgeneroService {

  private urlSpring = 'htpp://localhost:8080/subgenero'

  constructor(private http: HttpClient) { }

  // BACKEND
  getSubgeneros() {
    return this.http.get<SubGenero[]>(this.urlSpring);
  }

  addSubgenero(sub: SubGenero) {
    return this.http.post(this.urlSpring, sub)
  }

  deleteSubgenero(id: number) {
    return this.http.delete(`${this.urlSpring}/${id}`)
  }

  editarSubgenero(sub: SubGenero) {
    return this.http.put(this.urlSpring, sub)
  }

  getSubgeneroById(id: number) {
    return this.http.get<SubGenero>(`${this.urlSpring}/${id}`)
  }

}
