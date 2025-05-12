import {Pelicula} from './pelicula';

// las ? indican que el atributo es opcional
export interface SubGenero {
  id: number;
  nombre?: string; // por si solo usas el ID en algunas peticiones
}

