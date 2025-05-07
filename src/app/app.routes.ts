import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/main/about/about.component';
import { ProjectComponent } from './components/main/project/project.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', component: AboutComponent },
      { path: 'project', component: ProjectComponent },
    ],
  },
];
