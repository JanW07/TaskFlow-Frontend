// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMe } from '../../models/user-me';

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
