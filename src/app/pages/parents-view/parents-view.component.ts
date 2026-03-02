import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService, Review } from '../../services/data.service';

@Component({
  selector: 'app-parents-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './parents-view.component.html',
  styleUrl: './parents-view.component.scss'
})
export class ParentsViewComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getReviews().subscribe(data => {
      this.reviews = data.filter(r => r.status === 'approved');
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(Number(rating))).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  submitReview(form: NgForm) {
    if (form.invalid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const newReview: Review = {
      name: form.value.parentName,
      grade: form.value.grade,
      rating: Number(form.value.rating),
      text: form.value.reviewText,
      status: 'pending'
    };

    this.dataService.addReview(newReview).subscribe(() => {
      alert("Thank you for your feedback! It will appear on the website after verification.");
      form.resetForm();
      // Close modal using native bootstrap if available or just let user close it
    }, error => {
      alert("Submission failed. Please try again.");
    });
  }
}
