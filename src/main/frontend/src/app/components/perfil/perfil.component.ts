import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  nombreUsuario: any;

  constructor(private route: ActivatedRoute) { } // PARA PILLAR DATOS DE LA URL

  ngOnInit(): void {
    this.nombreUsuario = this.route.snapshot.paramMap.get('nombreUsuario');
  }
}
