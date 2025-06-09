import {Pelicula} from './pelicula';

// las ? indican que el atributo es opcional
export interface Director {
  id?: number;
  nombre: string;
  edad: number;
  poster?: string;
  paises: string[];
}
