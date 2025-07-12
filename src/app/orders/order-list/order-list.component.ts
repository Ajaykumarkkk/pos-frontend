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
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface orders {
  orderId: string;
  date: string;
  customer: string;
  // status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | string;
  payment: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID' | string;
  total: number;
  items: OrderItem[];
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {


  constructor(
    private router: Router,
    private ordersService: OrdersService,
    // private productService: ProductService
  ) { }


  // orders = [
  //   {
  //     orderId: 'ORD-2023-001',
  //     date: 'May 10, 2023',
  //     customer: 'John Doe',
  //     status: 'COMPLETED',
  //     payment: 'PAID',
  //     total: 10.45,
  //     items: [
  //       { name: 'Coffee', qty: 2, price: 2.5 },
  //       { name: 'Chocolate Chip Cookie', qty: 3, price: 1.5 }
  //     ]
  //   },
  //   {
  //     orderId: 'ORD-2023-002',
  //     date: 'May 15, 2023',
  //     customer: 'Jane Smith',
  //     payment: 'PENDING',
  //     total: 9.89
  //   },
  //   {
  //     orderId: 'ORD-2023-003',
  //     date: 'May 1, 2023',
  //     customer: 'Bob Johnson',
  //     payment: 'PAID',
  //     total: 604.99
  //   },
  //   {
  //     orderId: 'ORD-2023-004',
  //     date: 'May 12, 2023',
  //     customer: 'Alice Williams',
  //     payment: 'PARTIALLY PAID',
  //     total: 46.18
  //   },
  //   {
  //     orderId: 'ORD-2023-005',
  //     date: 'May 16, 2023',
  //     customer: 'Walk-in Customer',
  //     payment: 'PENDING',
  //     total: 19.79
  //   }
  // ];

  selectedOrder: any = null;
  // statusFilter = '';
  paymentFilter = '';
  Orders: orders[] = [];

  // statusOptions = ['DRAFT', 'PLACED', 'CANCELLED', 'COMPLETED', 'RETURNED'];
  paymentOptions = ['PENDING', 'PAID', 'PARTIALLY PAID', 'FAILED', 'REFUNDED'];


  ngOnInit(): void {
    this.loadProducts(); // Load real API data
  }

  // loadProducts() {
  //   this.ordersService.getAllOrders().subscribe({
  //     next: (res: any) => {
  //       if (res.success && res.orderDetails) {
  //         this.Orderrr = res.orderDetails.map((item: any) => (

  //   {
  //           id: item.id || 0, // Ensure id is always a number
  //     orderId: 'ORD-2023-001',
  //     date: 'May 10, 2023',
  //     customer: 'John Doe',
  //     status: 'COMPLETED',
  //     payment: 'PAID',
  //     total: 10.45,
  //     items: [
  //       { name: 'Coffee', qty: 2, price: 2.5 },
  //       { name: 'Chocolate Chip Cookie', qty: 3, price: 1.5 }
  //     ]
  //   }
  //         ));
  //         console.log('Customer list loaded:', this.Orderrr);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Failed to load orders:', err);
  //     }
  //   });
  // }
  // Orderrr: Order[] = [];

  loadProducts() {
    this.ordersService.getAllOrders().subscribe({
      next: (res: any) => {
        if (res.success && res.orderDetails) {
          this.Orders = res.orderDetails.map((order: any) => {
            const items: OrderItem[] = order.orderProductMappings.map((item: any) => ({
              name: item.productDetail?.productName || 'Unnamed Product',
              qty: item.qty,
              price: item.price
            }));

            return {
              orderId: order.orderNumber || `ORD-${order.id}`,
              date: new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }),
              customer: order.customer?.name || 'Unknown',
              // status: 'COMPLETED', // or use real status if available in the future
              payment: order.paymentMethod?.toUpperCase() || 'UNPAID',
              total: order.total,
              items: items
            };
          });

          // console.log('Orderrrrr loaded:', this.Orderrr);
          console.log('Orders loaded:', this.Orders);
        }
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
      }
    });
  }




  openOrder(order: any) {
    this.selectedOrder = order;
  }

  closeModal() {
    this.selectedOrder = null;
  }

  newOrder() {
    this.router.navigate(['orders/create']);
    // this.selectedOrder = null;
  }

  filteredOrders() {
    return this.Orders.filter(order =>
      // (!this.statusFilter || order.status === this.statusFilter) &&
      (!this.paymentFilter || order.payment === this.paymentFilter)
    );
  }

  getTotal(item: any) {
    return item.qty * item.price;
  }
}
