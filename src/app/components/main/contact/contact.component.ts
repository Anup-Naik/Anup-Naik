import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section id="contact">
      <h2 class="section-title">Contact Me</h2>
      <article class="bg-t">
        <form class="contactForm" (ngSubmit)="OnSubmit()" #contactForm="ngForm">
          <div class="form-control">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              [(ngModel)]="email"
              required
              autocomplete="off"
            />
            <p class="error">Enter a valid email.</p>
          </div>
          <div class="form-control">
            <label for="message">Message</label>
            <textarea
              type="text"
              name="message"
              id="message"
              [(ngModel)]="message"
              required
              autocomplete="off"
              minlength="50"
              maxlength="500"
            ></textarea>
            <p class="error">{{message().length}}/500 (Min. 50 characters)</p>
          </div>
          <button style="border: none;" class="btn btn-brand" [disabled]="!contactForm.valid">Submit</button>
          <p class="submit">Thank You for Reaching out.</p>
        </form>
      </article>
    </section>
  `,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = signal('');
  message = signal('');
  OnSubmit() {
    if (!this.email() || !this.message) return;
    console.log(this.email(), this.message());
  }
}
