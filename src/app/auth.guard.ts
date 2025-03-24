import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Optionally, validate the token here // todo
      return true;
    } else {
      // If no token, redirect to the login page
      return this.router.createUrlTree(['/login']);
    }
  }
}
