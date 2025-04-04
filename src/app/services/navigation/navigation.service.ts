import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  goBack(path: string = '/dashboard'): void {
    this.router.navigate([path]);
  }
}
