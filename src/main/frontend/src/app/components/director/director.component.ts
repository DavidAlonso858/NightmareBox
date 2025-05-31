import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-director',
  standalone: true,
  imports: [],
  templateUrl: './director.component.html',
  styleUrl: './director.component.css'
})

export class DirectorComponent {

  constructor(private title: Title) {
    this.title.setTitle('NightmareBox - Directores');
  }
  
}
