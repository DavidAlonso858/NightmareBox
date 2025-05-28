import { Component, NgModule } from '@angular/core';
import { SubgeneroService } from '../../service/subgenero.service';
import { SubGenero } from '../../models/subgenero';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent {

  subgeneroLista: SubGenero[] = [];

  constructor(private subgenero: SubgeneroService) {

  }

  ngOnInit(): void {
    this.subgenero.getSubgeneros().subscribe((sub) => {
      this.subgeneroLista = sub;
      console.log(this.subgeneroLista);

    })

  }


}
