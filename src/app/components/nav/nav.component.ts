import { Component, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  changeBg = input();

  toggleMenu(menu: HTMLUListElement) {
    menu.classList.toggle('active');
  }
}
