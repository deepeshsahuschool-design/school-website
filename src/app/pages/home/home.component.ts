import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService, Notification } from '../../services/data.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }
}
