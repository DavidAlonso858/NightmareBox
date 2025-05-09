import {Rol} from './rol';
import {Valoracion} from './valoracion';
import {Pelicula} from './pelicula';

// las ? indican que el atributo es opcional
export interface Usuario {
  id?: number;
  nombre: string;
  password: string;
  rolUsuario: Rol;
  valoracionesUsuario?: Valoracion[];
  peliculasFavs?: Pelicula[];
}
