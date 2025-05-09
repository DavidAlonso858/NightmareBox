import {Pelicula} from './pelicula';

// las ? indican que el atributo es opcional
export interface SubGenero {
  id?: number;
  nombre: string;
  peliculas?: Pelicula[];
}
