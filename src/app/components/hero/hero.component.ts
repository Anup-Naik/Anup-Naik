import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
     <header id="hero" class="bg-i">
      <h1 class="greeter">
        HI <br />I Am <span class="highlight">Anup Naik,</span> <br />A
        <span class="highlight">MEAN-Stack</span> Developer
      </h1>
    </header>
  `,
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
