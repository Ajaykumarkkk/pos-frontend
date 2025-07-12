import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { SaleCreateComponent } from './sales/sale-create/sale-create.component';
import { SaleHistoryComponent } from './sales/sale-history/sale-history.component';

import { AuthGuard } from './auth.guard'; // 👉 Import the guard
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderCreateEditComponent } from './orders/order-create-edit/order-create-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer/customer-add-edit/customer-add-edit.component';
import { BillListComponent } from './orders/bill-list/bill-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'products/edit/:id', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'sales/create', component: SaleCreateComponent, canActivate: [AuthGuard] },
  { path: 'sales/history', component: SaleHistoryComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'orders/create', component: OrderCreateEditComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customers/create', component: CustomerAddEditComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
