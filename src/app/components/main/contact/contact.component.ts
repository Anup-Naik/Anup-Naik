import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section id="contact">
      <h2 class="section-title">Contact Me</h2>
      <article class="bg-t">
        <form
          method="post"
          name="contact"
          class="contactForm"
          #contactForm="ngForm"
          (ngSubmit)="OnSubmit(contactForm)"
          netlify
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <!-- Hidden input for Netlify form identification -->
          <input type="hidden" name="form-name" value="contact" />

          <!-- Honeypot field to prevent spam -->
          <p class="hidden">
            <label
              >Don't fill this out if you're human: <input name="bot-field"
            /></label>
          </p>

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
        </form>
        <p [class]="{ submit: true, submitted: isSubmitted() }">
          Thank you for reaching out. I will contact you soon.
        </p>
      </article>
    </section>
  `,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = signal('');
  message = signal('');
  isSubmitted = signal(false);

  OnSubmit(form: NgForm) {
    if (!form.valid) return;

    const formData = new FormData();
    formData.append('form-name', 'contact');
    formData.append('email', this.email());
    formData.append('message', this.message());

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        form.reset();
        this.email.set('');
        this.message.set('');
        this.isSubmitted.set(true);

        setTimeout(() => {
          this.isSubmitted.set(false);
        }, 5000);
      })
      .catch((e) => {
        console.error('Error Submitting Form');
      });
  }
}
