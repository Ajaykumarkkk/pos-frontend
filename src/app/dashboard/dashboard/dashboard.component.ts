// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent {

//   dailySales = 1254.45;
//   dailyOrders = 32;
//   avgOrderValue = 39.20;
//   lowStockItems = 5;

// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    {
      title: 'Daily Sales',
      value: '$1,254.45',
      change: '+12.5%',
      trend: 'up',
      icon: '💲'
    },
    {
      title: 'Daily Orders',
      value: '32',
      change: '+8.2%',
      trend: 'up',
      icon: '🛒'
    }
  ];

  topProducts = ['Coffee', 'Burger', 'Tea', 'Pizza'];

  recentOrders = [
    { order: 'ORD-2023-005', customer: 'Walk-in', status: 'Pending', amount: 19.79 },
    { order: 'ORD-2023-004', customer: 'Alice Williams', status: 'Partially Paid', amount: 46.18 },
    { order: 'ORD-2023-003', customer: 'Bob Johnson', status: 'Completed', amount: 604.99 },
    { order: 'ORD-2023-002', customer: 'Jane Smith', status: 'Pending', amount: 9.89 },
    { order: 'ORD-2023-001', customer: 'John Doe', status: 'Completed', amount: 10.45 }
  ];

  barChartData = [
    { name: 'Electronics', value: 1200 },
    { name: 'Meals', value: 600 },
    { name: 'Snacks', value: 200 }
  ];

  colorScheme = {
    domain: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350', '#AB47BC']
  };
  lineChartData = [
    {
      "name": "Revenue",
      "series": [
        { "name": "Jan", "value": 5000 },
        { "name": "Feb", "value": 7000 },
        // ...
      ]
    }
  ];

  constructor(
    private router: Router,
    private ordersService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.loadDashBoardReports(); // Load real API data
  }

  // loadDashBoardReports() {
  //   this.ordersService.getdashboardDetails().subscribe({
  //     next: (res: any) => {
  //       if (res.success && res.reportDetails) {
  //         console.log("Dashboard reports loaded:", res.reportDetails);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Failed to load bills:', err);
  //     }
  //   });
  // }

  loadDashBoardReports() {
    this.ordersService.getdashboardDetails().subscribe({
      next: (res: any) => {
        if (res.success && res.reportDetails && res.reportDetails.length > 0) {
          const data = res.reportDetails[0];

          this.stats = [
            {
              title: 'Daily Sales',
              value: `₹${data.dailySales.toFixed(2)}`,
              change: '', // You can add logic to calculate percentage change
              trend: '',
              icon: '💲'
            },
            {
              title: 'Monthly Sales',
              value: `₹${data.monthlySales.toFixed(2)}`,
              change: '',
              trend: '',
              icon: '📆'
            },
            {
              title: 'Today On Account',
              value: `₹${data.todayOnAccount.toFixed(2)}`,
              change: '',
              trend: '',
              icon: '📌'
            },
            {
              title: 'Monthly On Account',
              value: `₹${data.monthlyOnAccount.toFixed(2)}`,
              change: '',
              trend: '',
              icon: '📊'
            },
            {
              title: 'Today Order Count',
              value: data.todayOrderCount,
              change: '',
              trend: '',
              icon: '🛒'
            },
            {
              title: 'Monthly Order Count',
              value: data.monthlyOrderCount,
              change: '',
              trend: '',
              icon: '📦'
            }
          ];
        }
      },
      error: (err) => {
        console.error('Failed to load dashboard reports:', err);
      }
    });
  }

}
