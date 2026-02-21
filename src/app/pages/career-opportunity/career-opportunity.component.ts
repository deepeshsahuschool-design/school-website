import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-career-opportunity',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './career-opportunity.component.html',
  styleUrl: './career-opportunity.component.scss'
})
export class CareerOpportunityComponent {
  constructor(private http: HttpClient) {}

  submitApplication(form: NgForm) {
    if (form.invalid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const formData = new FormData();
    formData.append('access_key', 'c4768f21-4c1a-4f0b-82fc-55897303ebb8');
    formData.append('subject', 'New Job Application - School Website');
    formData.append('name', form.value.fullName);
    formData.append('email', form.value.email);
    formData.append('phone', form.value.phone);
    formData.append('message', form.value.message);
    
    // For the file, we need to access the native element or use a different approach
    // In this prototype, we'll just alert that the data is being sent.
    // If we wanted to handle the file, we'd need a reference to the input.
    
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append('attachment', fileInput.files[0]);
    }

    this.http.post('https://api.web3forms.com/submit', formData)
      .subscribe({
        next: () => {
          alert("Application submitted successfully! Our team will review your profile and get back to you.");
          form.resetForm();
        },
        error: () => {
          alert("Something went wrong. Please try again later.");
        }
      });
  }
}
