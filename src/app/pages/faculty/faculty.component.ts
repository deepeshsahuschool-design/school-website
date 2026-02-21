import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.scss'
})
export class FacultyComponent {

  faculty = [
    {
      name: 'Shikha Dewangan',
      role: 'Head Mistress',
      description: 'Leading the school with dedication and vision, ensuring academic excellence and a nurturing learning environment for every child.'
    },
    {
      name: 'Hulas Dewangan',
      role: 'Administrator',
      description: 'Managing school operations efficiently while supporting students, parents, and staff to ensure smooth day-to-day functioning.'
    },
    {
      name: 'Ganesh Patel',
      role: 'Dance Teacher',
      description: 'Inspiring students through rhythm and movement, teaching various dance styles while building confidence, creativity, and stage presence.'
    },
    {
      name: 'Anjali',
      role: 'Pre Primary Teacher',
      description: 'Creating a joyful and engaging classroom where young learners develop foundational skills through play, stories, and creative activities.'
    },
    {
      name: 'Rashmi Yadav',
      role: 'Primary Teacher',
      description: 'Building strong academic foundations in core subjects while encouraging curiosity, critical thinking, and a love for learning.'
    }
    
  ];
}
