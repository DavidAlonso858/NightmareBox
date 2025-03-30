import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private url = 'http://localhost:3001/almacenDirectores';

  constructor(private http: HttpClient) { }

  getDirectores() {
    return this.http.get<Director[]>(this.url);
  }
}
