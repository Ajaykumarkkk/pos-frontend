import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/customer.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  billNumber: string = '';
  currentDate: string = '';
  customers: any[] = [];
  selectedCustomer: any = null;
  paymentMethods = ['On Account', 'Cash', 'Mobile Payment', 'On Account Payment'];
  selectedPaymentMethod: string = 'Cash';

  // orderTotal: number = 0;
  // customerPays: number = 0;
  customerPays: number | null = null;
  orderTotal: number | null = null;
  errorMessage: string = '';

  dummyItems = [
    { name: 'Lorem ipsum', qty: 1, price: 9.2 },
    { name: 'Lorem ipsum dolor sit', qty: 1, price: 19.2 }
  ];

  // Or bind to selectedProducts if coming from parent

  constructor(
    private customerService: CustomerService,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.generateBillNumber();
    this.currentDate = moment().format('YYYY-MM-DD');
    this.loadCustomers();
  }

  generateBillNumber() {
    const datePart = moment().format('YYYYMMDD');
    const sequence = '001'; // You can increment this based on backend logic
    this.billNumber = `BILL-${datePart}-${sequence}`;
  }

  onCustomerPaysBlur() {
    if (this.customerPays === null) {
      this.customerPays = 0;
    }
  }

  onCustomerPaysFocus() {
    if (this.customerPays === 0) {
      this.customerPays = null;
    }
  }

  onOrderTotalBlur() {
    if (this.orderTotal === null) {
      this.orderTotal = 0;
    }
  }

  onOrderTotalFocus() {
    if (this.orderTotal === 0) {
      this.orderTotal = null;
    }
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (res: any) => {
        if (res.success && res.customers) {
          this.customers = res.customers.map((item: any) => ({
            id: item.id,
            name: (item.name + ' கடன் ' + item.receivableFromCustomer) || 'Unnamed'
          }));
        }
      },
      error: (err) => {
        console.error('Failed to load customers:', err);
      }
    });
  }

  get balanceReturned(): number {
    return Math.max((this.customerPays ?? 0) - (this.orderTotal ?? 0), 0);
  }

  saveBill(print = false) {
    // Validation check
    if (!this.selectedCustomer) {
      this.errorMessage = 'Please select a customer.';
      return;
    }

    if ((this.orderTotal ?? 0) <= 0) {
      this.errorMessage = 'Order total must be greater than zero.';
      return;
    }
    if (((this.customerPays ?? 0) > (this.orderTotal ?? 0)) && (this.selectedPaymentMethod === 'On Account')) {
      this.errorMessage = 'order total must be greater than Customer pays.';
      return;
    }
    if (!((this.customerPays ?? 0) >= (this.orderTotal ?? 0)) && (this.selectedPaymentMethod !== 'On Account')) {
      this.errorMessage = 'Customer pays must be greater than or equal to order total.';
      return;
    }

    this.errorMessage = ''; // Clear error on valid input
    const payload = {
      billNumber: this.billNumber,
      date: this.currentDate,
      customer: this.selectedCustomer,
      status: this.selectedPaymentMethod,
      orderTotal: this.orderTotal,
      customerPays: this.customerPays,
      balanceReturned: this.balanceReturned
    };

    console.log(print ? 'Print & Save' : 'Save', payload);

    this.ordersService.createBill(payload).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        this.router.navigate(['/bills']);
      },
      error: (error) => {
        console.error('Error creating bill:', error);
      }
    });

  }
  cancelBill() {
    this.customers = [];
    this.router.navigate(['/bills']);
  }

  printReceipt() {
    // Validation check
    if (!this.selectedCustomer) {
      this.errorMessage = 'Please select a customer.';
      return;
    }

    if ((this.orderTotal ?? 0) <= 0) {
      this.errorMessage = 'Order total must be greater than zero.';
      return;
    }

    this.errorMessage = ''; // Clear error on valid input
    const printContent = document.getElementById('receipt-content')?.innerHTML;
    const WindowPrt = window.open('', '', 'width=400,height=600');

    if (WindowPrt && printContent) {
      WindowPrt.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            body { font-family: monospace; padding: 10px; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            table { width: 100%; margin-top: 10px; }
            td, th { text-align: left; padding: 4px; }
            hr { border: dashed 1px #000; margin: 10px 0; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContent}
        </body>
      </html>
    `);
      WindowPrt.document.close();
    }

    const payload = {
      billNumber: this.billNumber,
      date: this.currentDate,
      customer: this.selectedCustomer,
      status: this.selectedPaymentMethod,
      orderTotal: this.orderTotal,
      customerPays: this.customerPays,
      balanceReturned: this.balanceReturned
    };

    console.log('Print & Save', payload);

    this.ordersService.createBill(payload).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        this.router.navigate(['/bills']);
      },
      error: (error) => {
        console.error('Error creating bill:', error);
      }
    });
  }

}
