import {Director} from './director';
import {Valoracion} from './valoracion';
import {SubGenero} from './subgenero';
import {Usuario} from './usuario';

// las ? indican que el atributo es opcional
export interface Pelicula {
  id?: number;
  titulo: string;
  year: string; // Año como string por el formato yyyy
  duracion: number;
  sinopsis?: string;
  premio?: boolean;
  poster?: string;
  paises?: string[];
  director: Director;
  valoracion?: Valoracion;
  subGenero?: SubGenero;
  usuariosFavorita?: Usuario[];
}

