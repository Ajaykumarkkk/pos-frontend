import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  departments = [
    { id: 1, dep: "Client" }
  ];

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      departmentId: [1, Validators.required]
    });

    this.loadDepartments(); // call API
  }

  loadDepartments() {
    this.authService.getAllDepartment().subscribe({
      next: (res: any) => {
        if (res.success && res.departments) {
          this.departments = res.departments;
          console.log("Departments loaded:", this.departments);
        }
      },
      error: (err) => {
        console.error("Failed to load departments", err);
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      alert('Please check the form and make sure passwords match.');
      return;
    }
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log("formData", formData);
      this.authService.register(formData).subscribe({
        next: (res: any) => {
          console.log('Registration successful', res);
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          alert('Registration failed. Please try again.');
        },
      });
    } else {
      alert('Form invalid...');
      return;
    }
  }
  // onSubmit(): void {
  //   if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
  //     alert('Please check the form and make sure passwords match.');
  //     return;
  //   }

  //   const payload = {
  //     fullName: this.registerForm.value.fullName,
  //     email: this.registerForm.value.email,
  //     password: this.registerForm.value.password,
  //     role: this.registerForm.value.role
  //   };

  //   this.http.post('/api/signup', payload).subscribe({
  //     next: () => {
  //       alert('Account created successfully!');
  //       this.router.navigate(['/login']);
  //     },
  //     error: err => {
  //       console.error(err);
  //       alert('Signup failed!');
  //     }
  //   });
  // }
  register() {
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe(
      () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      err => {
        alert('Registration failed');
      }
    );
  }
}
