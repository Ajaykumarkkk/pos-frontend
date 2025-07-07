import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    // LoginComponent,
    // RegisterComponent

    // ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
