import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true, // Add standalone: true if using Angular standalone components
  imports: [FormsModule, NgClass],
  template: `
    <section id="contact">
      <h2 class="section-title">Contact Me</h2>
      <article class="bg-t">
        <form
          method="POST"
          name="contact"
          class="contactForm"
          #contactForm="ngForm"
          netlify
          data-netlify="true"
          netlify-honeypot="bot-field"
          (ngSubmit)="handleSubmit()"
        >
          <!-- Hidden input for Netlify form identification -->
          <input type="hidden" name="form-name" value="contact" />
          
          <!-- Honeypot field to prevent spam -->
          <p class="hidden">
            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
          </p>

          <div class="form-control">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              [(ngModel)]="email"
              (ngModelChange)="email.set($event)"
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
              (ngModelChange)="message.set($event)"
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
          <p [ngClass]="{ submit: true, submitted: isSubmitted }">
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
  isSubmitted = false;

  handleSubmit() {
    // Create a FormData object
    const form = document.querySelector('form');
    
    if (form) {
      // Manually handle form submission for Netlify
      const formData = new FormData(form);
      
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      })
      .then(() => {
        // Reset form and show success message
        this.email.set('');
        this.message.set('');
        this.isSubmitted = true;
        
        // Reset the submitted state after a delay
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      })
      .catch((error) => {
        console.error('Form submission error:', error);
      });
    }
  }
}