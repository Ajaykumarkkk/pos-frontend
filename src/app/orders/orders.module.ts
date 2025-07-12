import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
// import { OrderListComponent } from './order-list/order-list.component';
// import { OrderCreateEditComponent } from './order-create-edit/order-create-edit.component';

import { FormsModule } from '@angular/forms';
// import { BillListComponent } from './bill-list/bill-list.component'; // ✅ Add this


@NgModule({
  declarations: [
    // OrderListComponent,
    // OrderCreateEditComponent

    // BillListComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // ✅ Import here
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
