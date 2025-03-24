import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, UserMe } from '../user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userMe?: UserMe;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserMe().subscribe({
      next: (data) => this.userMe = data,
      error: (error) => {
        console.error('Failed to load user data', error);
        this.errorMessage = 'Failed to load user data.';
      }
    });
  }
}
