import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { SaleCreateComponent } from './sales/sale-create/sale-create.component';
import { SaleHistoryComponent } from './sales/sale-history/sale-history.component';

// import { AuthGuard } from './auth.guard'; // 👉 Import the guard
import { authGuard } from './auth.guard'; // update import
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderCreateEditComponent } from './orders/order-create-edit/order-create-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer/customer-add-edit/customer-add-edit.component';
import { BillListComponent } from './orders/bill-list/bill-list.component';
import { AddBillComponent } from './orders/add-bill/add-bill.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/create', component: ProductCreateComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: ProductCreateComponent, canActivate: [authGuard] },
  { path: 'sales/create', component: SaleCreateComponent, canActivate: [authGuard] },
  { path: 'sales/history', component: SaleHistoryComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [authGuard] },
  { path: 'orders/create', component: OrderCreateEditComponent, canActivate: [authGuard] },
  { path: 'customers', component: CustomerListComponent, canActivate: [authGuard] },
  { path: 'customers/create', component: CustomerAddEditComponent, canActivate: [authGuard] },
  { path: 'customers/edit/:id', component: CustomerAddEditComponent, canActivate: [authGuard] },
  { path: 'bills', component: BillListComponent, canActivate: [authGuard] },
  { path: 'bill/create', component: AddBillComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
