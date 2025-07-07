// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-order-list',
// //   templateUrl: './order-list.component.html',
// //   styleUrls: ['./order-list.component.scss']
// // })
// // export class OrderListComponent {

// // }


// // order-list.component.ts
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-order-list',
//   templateUrl: './order-list.component.html',
//   styleUrls: ['./order-list.component.scss']
// })
// export class OrderListComponent {
//   orders = [
//     {
//       orderNumber: 'ORD-2023-001',
//       date: 'May 10, 2023',
//       customer: 'John Doe',
//       status: 'COMPLETED',
//       payment: 'PAID',
//       total: '10.45'
//     },
//     {
//       orderNumber: 'ORD-2023-002',
//       date: 'May 15, 2023',
//       customer: 'Jane Smith',
//       status: 'PLACED',
//       payment: 'PENDING',
//       total: '9.89'
//     },
//     {
//       orderNumber: 'ORD-2023-003',
//       date: 'May 1, 2023',
//       customer: 'Bob Johnson',
//       status: 'COMPLETED',
//       payment: 'PAID',
//       total: '604.99'
//     },
//     {
//       orderNumber: 'ORD-2023-004',
//       date: 'May 12, 2023',
//       customer: 'Alice Williams',
//       status: 'PLACED',
//       payment: 'PARTIALLY PAID',
//       total: '46.18'
//     },
//     {
//       orderNumber: 'ORD-2023-005',
//       date: 'May 16, 2023',
//       customer: 'Walk-in Customer',
//       status: 'DRAFT',
//       payment: 'PENDING',
//       total: '19.79'
//     }
//   ];
// }
















import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  orders = [
    {
      orderId: 'ORD-2023-001',
      date: 'May 10, 2023',
      customer: 'John Doe',
      status: 'COMPLETED',
      payment: 'PAID',
      total: 10.45,
      items: [
        { name: 'Coffee', qty: 2, price: 2.5 },
        { name: 'Chocolate Chip Cookie', qty: 3, price: 1.5 }
      ]
    },
    {
      orderId: 'ORD-2023-002',
      date: 'May 15, 2023',
      customer: 'Jane Smith',
      status: 'PLACED',
      payment: 'PENDING',
      total: 9.89
    },
    {
      orderId: 'ORD-2023-003',
      date: 'May 1, 2023',
      customer: 'Bob Johnson',
      status: 'COMPLETED',
      payment: 'PAID',
      total: 604.99
    },
    {
      orderId: 'ORD-2023-004',
      date: 'May 12, 2023',
      customer: 'Alice Williams',
      status: 'PLACED',
      payment: 'PARTIALLY PAID',
      total: 46.18
    },
    {
      orderId: 'ORD-2023-005',
      date: 'May 16, 2023',
      customer: 'Walk-in Customer',
      status: 'DRAFT',
      payment: 'PENDING',
      total: 19.79
    }
  ];

  selectedOrder: any = null;
  statusFilter = '';
  paymentFilter = '';

  statusOptions = ['DRAFT', 'PLACED', 'CANCELLED', 'COMPLETED', 'RETURNED'];
  paymentOptions = ['PENDING', 'PAID', 'PARTIALLY PAID', 'FAILED', 'REFUNDED'];

  openOrder(order: any) {
    this.selectedOrder = order;
  }

  closeModal() {
    this.selectedOrder = null;
  }

  filteredOrders() {
    return this.orders.filter(order =>
      (!this.statusFilter || order.status === this.statusFilter) &&
      (!this.paymentFilter || order.payment === this.paymentFilter)
    );
  }

  getTotal(item: any) {
    return item.qty * item.price;
  }
}
