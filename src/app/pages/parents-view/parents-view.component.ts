import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parents-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './parents-view.component.html',
  styleUrl: './parents-view.component.scss'
})
export class ParentsViewComponent {
  reviews = [
    {
      name: 'Rahul Sharma',
      grade: 'Parent of Grade 2 Student',
      rating: 5,
      text: 'Pencil - The Creative School has been a wonderful experience for my daughter. The teachers are incredibly supportive and the creative approach to learning has really helped her excel.'
    },
    {
      name: 'Priya Patel',
      grade: 'Parent of Grade 5 Student',
      rating: 5,
      text: 'The infrastructure and the safety protocols are top-notch. I feel very secure sending my son here. The focus on holistic development is what sets this school apart.'
    },
    {
      name: 'Anil Verma',
      grade: 'Parent of KG & Grade 3 Students',
      rating: 4.5,
      text: 'Great school with a very active and engaged faculty. My children love the extra-curricular activities, especially the art and music programs.'
    },
    {
      name: 'Sunita Reddy',
      grade: 'Parent of Grade 1 Student',
      rating: 5,
      text: 'The personalized attention each student gets is commendable. The small class sizes make a huge difference in the learning process.'
    },
    {
      name: 'Vikram Singh',
      grade: 'Parent of Grade 4 Student',
      rating: 5,
      text: "We've seen a massive improvement in our son's confidence since he joined Pencil. The focus on public speaking and social skills is impressive."
    },
    {
      name: 'Megha Gupta',
      grade: 'Parent of Nursery Student',
      rating: 5,
      text: 'A very warm and welcoming environment. The communication between the school and parents is very transparent and frequent.'
    }
  ];

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  submitReview(form: NgForm) {
    if (form.invalid) {
      alert("Please fill all required fields correctly.");
      return;
    }
    
    console.log("Review submitted:", form.value);
    alert("Thank you for your feedback! Your review has been submitted for moderation.");
    form.reset();
  }
}
