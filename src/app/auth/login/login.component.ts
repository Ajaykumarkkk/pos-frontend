import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  loginForm: FormGroup;
  // departments = [
  //   { id: 1, dep: "Client" }
  // ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.authService.logout();
  }

  // ngOnInit(): void {

  //   // this.authService.logout(); // 👉 remove JWT
  //   // this.registerForm = this.fb.group({
  //   //   fullName: ['', Validators.required],
  //   //   email: ['', [Validators.required, Validators.email]],
  //   //   password: ['', Validators.required],
  //   //   confirmPassword: ['', Validators.required],
  //   //   departmentId: [1, Validators.required]
  //   // });

  //   // this.loadDepartments(); // call API
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log("formData", formData);
      this.authService.login(formData).subscribe({
        next: (res: any) => {
          console.log('Login successful', res);
          // localStorage.setItem('token', res.token);
          // this.router.navigate(['/dashboard']);
          this.authService.saveToken(res.token); // 👉 save JWT
          this.authService.refreshToken(res.refreshToken);
          this.loadUserDepartment(res.user?.departmentId);
          console.log("User Department ID:", res.user?.departmentId);

          this.authService.user(JSON.stringify(res.user));
          this.router.navigate(['/dashboard']); // 👉 after login, go to dashboard
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials. Please try again.');
        },
      });
    }
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      // (res: any) => {
      //   this.authService.saveToken(res.token);
      //   this.router.navigate(['/products']);
      // },
      // err => {
      //   alert('Login failed');
      // }
      {
        next: (res: any) => {
          // localStorage.setItem('token', res.token); // 👉 save JWT
          this.authService.saveToken(res.token); // 👉 save JWT
          this.router.navigate(['/products']); // 👉 after login, go to Products
        },
        error: (err) => {
          alert('Invalid credentials');
        }
      }
    );
  }

  // Inside the same service or a common user.service.ts
  loadUserDepartment(departmentId: number) {
    this.authService.getAllDepartment().subscribe({
      next: (res: any) => {
        if (res.success && res.departments) {
          const departments = res.departments;
          console.log("departmentId:", departmentId);
          console.log("Departments loaded:", departments);

          const matched = departments.find((dep: any) => dep.id === departmentId);
          console.log("matched:", matched);
          if (matched) {
            this.authService.userDepartment(matched.dep); // Store in localStorage
          }
          // this.departments = res.departments;
          // console.log("Departments loaded:", this.departments);
        }
      },
      error: (err) => {
        console.error("Failed to load departments", err);
      }
    });
    // this.authService.getAllDepartment().subscribe((res) => {
    //   if (res.success) {
    //     const departments = res.departments;
    //     const matched = departments.find(dep => dep.id === departmentId);

    //     if (matched) {
    //       localStorage.setItem('userDepartment', matched.dep); // Store in localStorage
    //     }
    //   }
    // });
  }


}
