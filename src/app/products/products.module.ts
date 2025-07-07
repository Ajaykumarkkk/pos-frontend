import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductCreateComponent } from './product-create/product-create.component';


@NgModule({
  declarations: [
    // ProductListComponent,
    // ProductCreateComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
