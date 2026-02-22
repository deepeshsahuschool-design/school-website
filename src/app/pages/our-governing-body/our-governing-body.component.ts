import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-governing-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-governing-body.component.html',
  styleUrl: './our-governing-body.component.scss'
})
export class OurGoverningBodyComponent {
  societyName = 'Praganya Seva avam Shikshan Sansthan, Chhattisgarh';
  
  members = [
    {
      name: 'Mrs. Shikha Dewangan',
      designation: 'President',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771779239/Shikha_hcaitr.jpg',
      description: 'An experienced education mentor and leader who guides the overall vision of the institution. She ensures a safe, nurturing, and child-friendly learning environment while promoting academic excellence, value-based education, and holistic development for young learners.'
    },
    {
      name: 'Rajni Kashyap',
      designation: 'Vice President',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698204/Rajni_Kashyap_kc23qy.jpg',
      description: 'Supports the President in policy implementation and school development initiatives. She focuses on strengthening parent-school relationships and encourages activities that enhance students’ confidence, creativity, and social skills.'
    },
    {
      name: 'Rajesh Kashyap',
      designation: 'Secretary',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771779239/Rajesh_twrxkc.jpg',
      description: 'Responsible for the administrative coordination of the school, he manages official documentation, communication, and regulatory compliance. He actively oversees daily operations and ensures smooth functioning between management, staff, and parents.'
    },
    {
      name: 'Revendra Dewangan',
      designation: 'Joint secretary',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698205/Revendra_Dewangan_srsbzv.jpg',
      description: 'Assists in administrative management and coordination of school programs and events. He helps organize academic schedules, school activities, and communication with parents to ensure efficient day-to-day functioning.'
    },
    {
      name: 'Hulas Dewangan',
      designation: 'Treasurer',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698204/Hulas_Dewangan_zcvrvp.jpg',
      description: 'Manages the financial planning and accounts of the institution. He ensures transparent budgeting, proper utilization of funds, and the availability of resources required for academics, activities, and school infrastructure.'
    },
    {
      name: 'Sukhdev Prasad Dewangan',
      designation: 'Board Member',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698204/Sukhdev_Prasad_Dewangan_b2vpoi.jpg',
      description: 'Plays an important role in planning institutional development and infrastructure improvement. He assists in monitoring school facilities, student welfare measures, and maintaining a safe and supportive campus environment.'
    },
    {
      name: 'Sharda Devi',
      designation: 'Board Member',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771699461/Sharda_Devi_wvrlbi.jpg',
      description: 'Actively involved in student welfare and cultural activities, she promotes moral values, discipline, and character building. She also encourages participation in co-curricular programs that help children grow socially and emotionally.'
    },
  ];
}
