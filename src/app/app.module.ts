import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms'; // <-- ✅ Add this

import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { SaleCreateComponent } from './sales/sale-create/sale-create.component';
import { SaleHistoryComponent } from './sales/sale-history/sale-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // If you're using <mat-select>
import { MatButtonModule } from '@angular/material/button'; // If you're using <button mat-button>
import { OrderCreateEditComponent } from './orders/order-create-edit/order-create-edit.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer/customer-add-edit/customer-add-edit.component';
import { BillListComponent } from './orders/bill-list/bill-list.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
// import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProductListComponent,
    OrderCreateEditComponent,
    OrderListComponent,
    ProductCreateComponent,
    SaleCreateComponent,
    SaleHistoryComponent,
    CustomerListComponent,
    BillListComponent,
    DashboardComponent,
    CustomerAddEditComponent,
    TopNavbarComponent,
    SidebarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // <-- ✅ Add this
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
    // LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
