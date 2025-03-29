// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from './models/login-response';
import { UserMe } from './models/user-me';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Adjust as needed

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: { email: string; password: string; firstName: string; lastName: string }): Observable<UserMe> {
    return this.http.post<UserMe>(`${this.apiUrl}/auth/register`, userData);
  }
}
