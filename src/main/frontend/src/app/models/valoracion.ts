import { Usuario } from './usuario';
import { Pelicula } from './pelicula';

export interface Valoracion {
  id: number;
  notaValoracion: number;
  usuario: Usuario;
  pelicula: Pelicula;
}
