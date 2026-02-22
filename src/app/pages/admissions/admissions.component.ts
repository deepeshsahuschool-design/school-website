import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admissions',
  imports: [FormsModule],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.scss'
})
export class AdmissionsComponent {

  submitForm(form: any) {

    if (form.invalid) {
      alert("Please fill all required fields");
      return;
    }

    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSeuKd_t0F2PeolXpkxGTFiGuwTd2fVItdQx24Kc1BeLeO-_gw/formResponse";

    const formData = new FormData();

    // REPLACE entry numbers with YOUR entry IDs
    formData.append("entry.516505484", form.value.parentName);
    formData.append("entry.331119834", form.value.childName);
    formData.append("entry.479078868", form.value.classApplying);
    formData.append("entry.2079678733", form.value.phone);
    formData.append("entry.245008877", form.value.email);

    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
    .then(() => {
      alert("Admission Inquiry submitted successfully! We will contact you soon.");
      form.resetForm();
    })
    .catch(() => {
      alert("Submission failed. Please try again.");
    });
  }

}
