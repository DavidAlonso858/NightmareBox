import { Director } from './director';
import { SubGenero } from './subgenero';

export interface Pelicula {
  id: number;
  titulo: string;
  year: string; // si se formatea como "2022"
  duracion: number;
  sinopsis?: string;
  premio?: boolean;
  poster?: string;
  paises: string[];
  director: Director;
  subGenero: SubGenero;
  mediaValoracion: number; // si el DTO incluye esto
}


