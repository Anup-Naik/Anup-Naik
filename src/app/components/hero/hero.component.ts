import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
    <header id="hero">
      <div class="skill-container">
        @for (img of imgs; track $index) {
        <img src="{{ '/logo/' + img + '.svg' }}" alt="skill" class="skill" />
        }
      </div>
      <div class="greeter-container">
      <h1 class="greeter">
        <span class="highlight">Hi,</span>  <br />I Am <span class="highlight">Anup Naik,</span> <br />A
        <span class="highlight">MEAN</span>-Stack Developer.
      </h1></div>
    </header>
  `,
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  imgs = Array.from({ length: 15 }).map((_, i) => {
    return (i + 1).toString().padStart(2, '0');
  });
  zone = inject(NgZone);
  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  skillContainer!: HTMLElement | null;
  skills!: HTMLImageElement[];
  velocity!: [number, number][];
  animationId!: number;
  speedX = 1.2;
  speedY = 0.6;
  boundAnimate: any;
  ngOnInit(): void {
    this.skillContainer =
      this.elementRef.nativeElement.querySelector('.skill-container');
    this.velocity = this.imgs.map((_, i) => {
      return [Math.random() * this.speedX, Math.random() * this.speedY];
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.skills = Array.from(
        this.elementRef.nativeElement.querySelectorAll<HTMLImageElement>(
          '.skill'
        )
      );
      if (!this.skills.length || !this.skillContainer) return;
      const contRect = this.skillContainer.getBoundingClientRect();
      this.skills.forEach((skill, i) => {
        const skillRect = skill.getBoundingClientRect();
        skill.style.top =
          (Math.random() * (contRect.height - skillRect.height)).toString() +
          'px';
        skill.style.left =
          (Math.random() * (contRect.width - skillRect.width)).toString() +
          'px';
      });
      this.boundAnimate = this.Animate.bind(this);

      this.zone.runOutsideAngular(this.boundAnimate);
    }, 100);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  Animate() {
    const contRect = this.skillContainer?.getBoundingClientRect();
    const skills = this.skills;
    if (!contRect || !skills.length) return;

    skills.forEach((skill, i) => {
      const skillRect = skill.getBoundingClientRect();
      const x = +(skill.style.left?.replace('px', '') || '50');
      const y = +(skill.style.top?.replace('px', '') || '50');
      let vx = this.velocity[i][0];
      let vy = this.velocity[i][1];

      if (x <= 0 || x >= contRect.width - skillRect.width) {
        vx = Math.random() * this.speedX * -1;
        if (x < 0) vx *= -1;
        this.velocity[i][0] = vx;
      }
      if (y <= 0 || y >= contRect.height - skillRect.height) {
        vy = Math.random() * this.speedY * -1;
        if (y < 0) vy *= -1;
        this.velocity[i][1] = vy;
      }

      skill.style.left = `${x + vx}px`;
      skill.style.top = `${y + vy}px`;
    });

    this.animationId = requestAnimationFrame(this.boundAnimate);
  }
}
