import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-admissions',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.scss'
})
export class AdmissionsComponent {
  constructor(private http: HttpClient) {}

  submitForm(form: any) {

    if (form.invalid) {
      alert("Please fill all required fields");
      return;
    }

    const formData = {
      access_key: 'c4768f21-4c1a-4f0b-82fc-55897303ebb8',

      subject: "New Admission Enquiry - School Website",

      parent_name: form.value.parentName,
      child_name: form.value.childName,
      class_applying: form.value.classApplying,
      phone: form.value.phone,
      email: form.value.email
    };

    this.http.post('https://api.web3forms.com/submit', formData)
      .subscribe({
        next: () => {
          alert("Inquiry submitted successfully! We will contact you soon.");
          form.reset();
        },
        error: () => {
          alert("Something went wrong. Please try again.");
        }
      });
  }

  
}
