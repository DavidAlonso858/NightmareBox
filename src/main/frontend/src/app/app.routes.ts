import { Routes } from '@angular/router';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { DirectorComponent } from './components/director/director.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

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
    }
];
