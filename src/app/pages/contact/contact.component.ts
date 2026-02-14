import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(private http: HttpClient) {}

  submitContact(form: any) {

    if (form.invalid) {
      alert("Please fill all fields");
      return;
    }

    const formData = {
      access_key: 'c4768f21-4c1a-4f0b-82fc-55897303ebb8',

      subject: "New Contact Message - School Website",

      name: form.value.firstName + " " + form.value.lastName,
      email: form.value.email,
      message: form.value.message,
      user_subject: form.value.subject
    };

    this.http.post('https://api.web3forms.com/submit', formData)
      .subscribe({
        next: () => {
          alert("Message sent successfully! We will contact you soon.");
          form.reset();
        },
        error: () => {
          alert("Something went wrong. Please try again later.");
        }
      });
  }

}
