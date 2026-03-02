import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Vacancy } from '../../services/data.service';

@Component({
  selector: 'app-career-opportunity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-opportunity.component.html',
  styleUrl: './career-opportunity.component.scss'
})
export class CareerOpportunityComponent implements OnInit {
  vacancies: Vacancy[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getVacancies().subscribe(data => {
      this.vacancies = data.filter(v => v.active);
    });
  }
}
