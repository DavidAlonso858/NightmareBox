import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private urlSpring = 'http://localhost:8080/director';

  constructor(private http: HttpClient) { }

  // BACKEND
  getDirectores() {
    return this.http.get<Director[]>(this.urlSpring);
  }

  addDirector(dire: Director) {
    return this.http.post(this.urlSpring, dire);
  }

  deleteDirector(id: number) {
    return this.http.delete(`${this.urlSpring}/${id}`);
  }

  editarDirector(dire: Director) {
    return this.http.put<Director>(`${this.urlSpring}/${dire.id}`, dire)
  }

  getDirectorById(id: number) {
    return this.http.get<Director>(`${this.urlSpring}/${id}`);
  }
}
