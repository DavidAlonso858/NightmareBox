import { Director } from './director'; 
import { Valoracion } from './valoracion';  
export interface Pelicula {
  id?: number; 
  titulo: string; 
  year: string; 
  duracion: number;
  sipnosis: string; 
  premio: boolean; 
  poster: string; 
  paises: string[]; 
  idDirector:  { id: number }; 
  valoracion: Valoracion; 
}

