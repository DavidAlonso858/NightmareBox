import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DirectorComponent } from "./components/director/director.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DirectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

}
