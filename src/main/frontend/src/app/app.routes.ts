import { Routes } from '@angular/router';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { DirectorComponent } from './components/director/director.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FichaPeliculaComponent } from './components/ficha-pelicula/ficha-pelicula.component';
import { EditarPeliculaComponent } from './components/pelicula/editar-pelicula/editar-pelicula.component';
import { CrearPeliculaComponent } from './components/pelicula/crear-pelicula/crear-pelicula.component';
import { CrearDirectorComponent } from './components/director/crear-director/crear-director.component';

export const routes: Routes = [
    {
        path: '', component: PresentacionComponent
    },
    {
        path: 'directores', component: DirectorComponent
    },
    {
        path: 'peliculas', component: PeliculaComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signUp', component: SignUpComponent
    },
    {
        path: 'usuario/:nombreUsuario', component: PerfilComponent

    },
    {
        path: 'usuarios', component: UsuariosComponent
    },
    {
        path: 'pelicula/:id', component: FichaPeliculaComponent
    },
    {
        path: 'editarPelicula/:id', component: EditarPeliculaComponent
    },
    {
        path: 'crearPelicula', component: CrearPeliculaComponent
    },
    {
        path: 'crearDirector', component: CrearDirectorComponent
    }

];
