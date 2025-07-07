import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    // DashboardComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
