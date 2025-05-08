import { Component, signal } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { HeroComponent } from './components/hero/hero.component';
import { ContactComponent } from './components/main/contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [
    MainComponent,
    NavComponent,
    HeroComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  changeNavBg = signal(true);
  OnScroll(e: any) {
    if (e.target.firstChild.getBoundingClientRect().top < -200) {
      this.changeNavBg.set(false);
    } else {
      this.changeNavBg.set(true);
    }
  }
}
