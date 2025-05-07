import { Component, ElementRef, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  elementRef = inject(ElementRef);
  projects!: Array<HTMLDivElement>;

  ngOnInit(): void {
    this.projects = Array.from(
      this.elementRef.nativeElement.querySelectorAll('.card')
    );
  }
  overall(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const card = target.closest('.card');
    if (!card) {
      this.toggleCollapse();
    }
  }
  toggleCollapse(index = this.projects.length) {
    this.projects.forEach((el, i) => {
      if (i === Number(index)) {
        el.classList.remove('collapse');
      } else {
        el.classList.add('collapse');
      }
    });
  }
}
