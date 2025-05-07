import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-root',
  imports: [MainComponent, NavComponent,HeroComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
