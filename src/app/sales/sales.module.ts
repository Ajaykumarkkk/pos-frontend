import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
// import { SaleCreateComponent } from './sale-create/sale-create.component';
// import { SaleHistoryComponent } from './sale-history/sale-history.component';


@NgModule({
  declarations: [
    // SaleCreateComponent,
    // SaleHistoryComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
