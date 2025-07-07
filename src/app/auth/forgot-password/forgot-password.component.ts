// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.scss']
// })
// export class ForgotPasswordComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // this.forgotPasswordForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   // password: ['', Validators.required],
    // })
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email;
    this.http
      .post('/api/auth/forgot-password', { email })
      .subscribe({
        next: (res) => {
          alert('Reset instructions sent successfully.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Failed to send reset instructions. Try again.');
          console.error(err);
        },
      });
  }
}
