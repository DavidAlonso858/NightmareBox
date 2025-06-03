import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent {
  nombreUsuario: string | null = null;
  usuario: Usuario | null = null;


  // PARA PILLAR DATOS DE LA URL
  constructor(private route: ActivatedRoute, private title: Title, private usuarioService: AuthService) {
    this.title.setTitle('NightmareBox-Perfil');
  }

  ngOnInit() {
    this.nombreUsuario = this.route.snapshot.paramMap.get('nombreUsuario');
    console.log(this.nombreUsuario);
    console.log(typeof this.nombreUsuario);

    this.usuarioService.getNombre(this.nombreUsuario).subscribe(usuario => {
      this.usuario = usuario;
      console.log(this.usuario);
    })

  }

  listarPeliculasFavoritas() {
    return this.usuario?.peliculasFavs || [];
  }

}
