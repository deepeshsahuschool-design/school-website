import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Teacher } from '../../services/data.service';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.scss'
})
export class FacultyComponent implements OnInit {
  faculty: Teacher[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTeachers().subscribe(data => {
      this.faculty = data;
    });
  }
}
