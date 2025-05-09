import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section id="contact">
      <h2 class="section-title">Contact Me</h2>
      <article class="bg-t">
        <form
          netlify
          method="post"
          class="contactForm"
          name="contactForm"
          data-netlify="true"
          #contactForm="ngForm"
        >
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
              minlength="30"
              maxlength="250"
            ></textarea>
            <p class="error">{{ message().length }}/250 (Min. 30 characters)</p>
          </div>
          <button
            type="submit"
            style="border: none;"
            class="btn btn-brand"
            [disabled]="!contactForm.valid"
          >
            Submit
          </button>
          <p [class]="{ submit: true, submitted: contactForm.submitted }">
            Thank you for reaching out. I will contact you soon.
          </p>
        </form>
      </article>
    </section>
  `,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = signal('');
  message = signal('');
}
