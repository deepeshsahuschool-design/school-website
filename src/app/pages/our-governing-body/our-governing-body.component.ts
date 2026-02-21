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
      designation: 'Educationist',
      image: '',
      description: 'A passionate educationist committed to fostering academic excellence through a highly child-friendly learning environment. She focuses on innovative pedagogical strategies and holistic curriculum development to empower students.'
    },
    {
      name: 'Rajesh Kashyap',
      designation: 'Social worker',
      image: '',
      description: 'A dedicated community advocate who actively coordinates grassroots initiatives. He works tirelessly to implement welfare programs that support and uplift marginalized groups.'
    },
    {
      name: 'Rajni Kashyap',
      designation: 'Social worker',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698204/Rajni_Kashyap_kc23qy.jpg',
      description: 'Deeply invested in community development, she drives impactful social welfare campaigns to ensure that essential resources, care, and support reach those most in need.'    },
    {
      name: 'Sukhdev Prasad Dewangan',
      designation: 'Social worker',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698204/Sukhdev_Prasad_Dewangan_b2vpoi.jpg',
      description: 'A tireless champion for social equity, he collaborates closely with local populations to establish sustainable development projects and promote widespread community awareness.'    },
    {
      name: 'Sharda Devi',
      designation: 'Social worker',
      image: '',
      description: 'Driven by compassion and a desire for positive change, she champions various grassroots causes with a special focus on women\'s empowerment and local health initiatives.'
    },
    {
      name: 'Hulas Dewangan',
      designation: 'ERP and IT coordinator',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698204/Hulas_Dewangan_zcvrvp.jpg',
      description: 'The technological backbone of the institution, he spearheads our digital transformation. He manages the ERP systems and IT infrastructure to guarantee seamless day-to-day operations.'
    },
    {
      name: 'Revendra Dewangan',
      designation: 'Educationist and Associate Administrative officer',
      image: 'https://res.cloudinary.com/doaqxjjpt/image/upload/v1771698205/Revendra_Dewangan_srsbzv.jpg',
      description: 'Expertly bridging the gap between academics and administration, he ensures high-level operational efficiency while upholding strict educational standards across all institutional activities.'    }
  ];
}
