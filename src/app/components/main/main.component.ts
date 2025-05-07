import { Component, ViewEncapsulation } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-main',
  imports: [AboutComponent,ProjectComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent {}
