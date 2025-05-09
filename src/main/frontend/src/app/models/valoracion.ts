import {Pelicula} from './pelicula';
import {Usuario} from './usuario';

// las ? indican que el atributo es opcional
export interface Valoracion {
  id?: number;
  notaValoracion: number;
  peliculasValoracion?: Pelicula[];
  usuarios?: Usuario[];
}
