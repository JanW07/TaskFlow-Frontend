// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  name: string;
  description: string;
  users: string[];
  board: string;
}

export interface Board {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  users: string[];
}

export interface UserMe {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  boards: Board[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Adjust this URL if needed
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUserMe(): Observable<UserMe> {
    return this.http.get<UserMe>(`${this.apiUrl}/user/me`);
  }
}
