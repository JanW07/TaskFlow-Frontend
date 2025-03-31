import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  formErrors: string[] = [];
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.formErrors = this.getFormErrors();
      return;
    }

    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful!');
          localStorage.setItem('jwtToken', response.token);
          console.log('Token saved!', localStorage.getItem('jwtToken'));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.formErrors = ['Invalid login credentials'];
        }
      });
    }
  }

  private getFormErrors(): string[] {
    const errors: string[] = [];
    const controls = this.loginForm.controls;

    if (controls['email'].errors) {
      if (controls['email'].errors['required']) {
        errors.push('Email is required.');
      }
      if (controls['email'].errors['email']) {
        errors.push('Please enter a valid email.');
      }
    }
    if (controls['password'].errors) {
      if (controls['password'].errors['required']) {
        errors.push('Password is required.');
      }
    }
    return errors;
  }
}
