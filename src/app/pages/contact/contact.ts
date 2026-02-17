import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = inject(FormBuilder);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submitted = false;

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      alert(`Mensaje enviado por ${this.contactForm.value.email}!`);
      this.contactForm.reset();
      this.submitted = true;
      setTimeout(() => { this.submitted = false; }, 3000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
