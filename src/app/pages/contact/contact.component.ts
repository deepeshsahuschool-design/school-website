import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  submitContact(form: any) {

    if (form.invalid) {
      alert("Please fill all fields");
      return;
    }

    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScIRa2Qgn45Nv4hZZF47wcnmkj2hE741BgfDbmhPZ6qk_wJMA/formResponse";

    const formData = new FormData();

    // combine first + last name
    const fullName = form.value.firstName + " " + form.value.lastName;

    // Replace entry IDs with YOUR real ones
    formData.append("entry.544682764", fullName);
    formData.append("entry.1794944016", form.value.email);
    formData.append("entry.283975819", form.value.subject);
    formData.append("entry.118187251", form.value.message);

    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
    .then(() => {
      alert("Message sent successfully! We will contact you soon.");
      form.resetForm();
    })
    .catch(() => {
      alert("Submission failed. Please try again later.");
    });
  }


}
