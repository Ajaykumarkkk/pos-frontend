import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
// import { CustomerListComponent } from './customer-list/customer-list.component';
// import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';


@NgModule({
  declarations: [
    // CustomerListComponent,
    // CustomerAddEditComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
