import { Pelicula } from "./pelicula";

export interface Director {
    id: number,
    nombre: string,
    edad: number,
    poster: string,
    paises: string[],
    peliculasDirector?: Pelicula[];
}
