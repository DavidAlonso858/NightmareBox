import { Pelicula } from './pelicula';

export interface Usuario {
  id: number;
  nombre: string;
  password: string; // si se usa en login/registro
  rolUsuario: 'ADMINISTRADOR' | 'USUARIO';
  peliculasFavs?: Pelicula[];
}
