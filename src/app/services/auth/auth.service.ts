// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/login-response';
import { UserMe } from '../../models/user-me';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    // Optionally, you could validate the token here. //todo
    return !!token;
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: { email: string; password: string; firstName: string; lastName: string }): Observable<UserMe> {
    return this.http.post<UserMe>(`${this.apiUrl}/auth/register`, userData);
  }
}
