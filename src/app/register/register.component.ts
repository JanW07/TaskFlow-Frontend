import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  formErrors: string[] = [];
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    const password = this.registerForm.get('password')?.value;
    const repeatPasswordControl = this.registerForm.get('repeatPassword');
    if (password !== repeatPasswordControl?.value) {
      repeatPasswordControl?.setErrors({ ...repeatPasswordControl?.errors, 'mismatch': true });
    } else {
      if (repeatPasswordControl?.errors && repeatPasswordControl.errors['mismatch']) {
        const { mismatch, ...rest } = repeatPasswordControl.errors;
        repeatPasswordControl.setErrors(Object.keys(rest).length ? rest : null);
      }
    }

    if (this.registerForm.invalid) {
      this.formErrors = this.getFormErrors();
      return;
    }

    const userData = this.registerForm.value;
    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.formErrors = ['Registration failed. Please try again.'];
      }
    });
  }

  private getFormErrors(): string[] {
    const errors: string[] = [];
    const controls = this.registerForm.controls;

    if (controls['firstName'].errors) {
      if (controls['firstName'].errors['required']) {
        errors.push('First name is required.');
      }
    }
    if (controls['lastName'].errors) {
      if (controls['lastName'].errors['required']) {
        errors.push('Last name is required.');
      }
    }
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
    if (controls['repeatPassword'].errors) {
      if (controls['repeatPassword'].errors['required']) {
        errors.push('Repeat password is required.');
      }
      if (controls['repeatPassword'].errors['mismatch']) {
        errors.push('Passwords do not match.');
      }
    }
    return errors;
  }
}
