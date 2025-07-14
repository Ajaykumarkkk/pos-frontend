import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';

interface Bills {
  billNumber: string,
  orderNumber: string,
  date: string | Date,
  customerName: string,
  total: number,
  customerPays: number,
  remaining: number,
  status: string
}

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent {
  bills: Bills[] = [];

  constructor(
    private router: Router,
    private ordersService: OrdersService,
  ) { }

  searchTerm = '';
  selectedBill: any = null;
  showModal = false;

  get filteredBills() {
    return this.bills.filter(bill =>
      bill.billNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bill.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.loadProducts(); // Load real API data
  }

  // loadProducts() {
  //   this.ordersService.getAllBills().subscribe({
  //     next: (res: any) => {
  //       if (res.success && res.billdetails) {
  //         this.bills = res.billdetails.map((item: any) => ({
  //           billNumber: item.billNumber || 'Unknown Bill',
  //           orderNumber: item.orderNumber || 'Unknown Order',
  //           date: item.date ? new Date(item.date) : new Date(),
  //           customerName: item.customer.name || 'Unknown Customer',
  //           total: item.billAmount || 0,
  //           remaining: item.customerPays || 0,
  //           customerPays: item.balanceReturned || 0,
  //           status: item.status || 'DRAFT'
  //         }));
  //         console.log('billdetails loaded:', this.bills);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Failed to load products:', err);
  //     }
  //   });
  // }

  loadProducts() {
    this.ordersService.getAllBills().subscribe({
      next: (res: any) => {
        if (res.success && res.billdetails) {
          this.bills = res.billdetails.map((item: any) => {
            const orderProducts = item.orderSale?.orderProductMappings || [];

            const items = orderProducts.map((prod: any) => ({
              name: prod.productDetail?.productName || 'Unknown',
              qty: prod.qty,
              price: prod.price
            }));

            return {
              billNumber: item.billNumber,
              orderNumber: item.orderSale?.orderNumber || 'CUSTOM BILL',
              date: item.date ? new Date(item.date) : new Date(),
              customerName: item.customer?.name || 'Unknown Customer',
              total: item.billAmount || 0,
              customerPays: item.customerPays || 0,
              remaining: item.balanceReturned || 0,
              status: item.status || 'DRAFT',
              items
            };
          });

          console.log('Bills loaded:', this.bills);
        }
      },
      error: (err) => {
        console.error('Failed to load bills:', err);
      }
    });
  }


  openModal(bill: any) {
    this.selectedBill = bill;
    this.showModal = true;
  }

  navigateToAddBill() {
    this.router.navigate(['/bill/create']);
  }

  closeModal() {
    this.showModal = false;
    this.selectedBill = null;
  }

  // printBill(bill: any) {
  //   const printWindow = window.open('', '', 'width=600,height=600');
  //   if (!printWindow) return;

  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <style>
  //           body { font-family: Arial, sans-serif; padding: 20px; }
  //           h2 { margin-top: 0; }
  //           .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
  //           .label { font-weight: bold; }
  //           .status {
  //             padding: 4px 10px;
  //             border-radius: 10px;
  //             font-weight: bold;
  //             background-color: ${this.getStatusColor(bill.status)};
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <h2>${bill.orderNumber}</h2>
  //         <div class="row"><span class="label">Customer:</span><span>John Doe</span></div>
  //         <div class="row"><span class="label">Date:</span><span>${bill.date.toDateString()}</span></div>
  //         <div class="row"><span class="label">Status:</span><span class="status">${bill.status}</span></div>
  //         <div class="row"><span class="label">Total:</span><span>$${bill.total.toFixed(2)}</span></div>
  //         <div class="row"><span class="label">CustomerPays:</span><span>$${bill.customerPays.toFixed(2)}</span></div>
  //         <div class="row"><span class="label">BalanceReturned:</span><span>$${bill.remaining.toFixed(2)}</span></div>
  //         <hr />
  //         <p style="text-align: center;">Thank you!</p>
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  //   printWindow.print();
  // }

  // printBill(bill: any) {
  //   const printWindow = window.open('', '', 'width=600,height=600');
  //   if (!printWindow) return;

  //   interface BillItem {
  //     name: string;
  //     qty: number;
  //     price: number;
  //   }

  //   const itemRows: string = (bill.items as BillItem[]).map((item: BillItem) => `
  //   <tr>
  //     <td>${item.name}</td>
  //     <td>${item.qty}</td>
  //     <td>₹${item.price.toFixed(2)}</td>
  //     <td>₹${(item.qty * item.price).toFixed(2)}</td>
  //   </tr>
  // `).join('');

  //   printWindow.document.write(`
  //   <html>
  //     <head>
  //       <style>
  //         body { font-family: Arial, sans-serif; padding: 20px; }
  //         h2 { margin-top: 0; }
  //         .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
  //         .label { font-weight: bold; }
  //         table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  //         th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
  //       </style>
  //     </head>
  //     <body>
  //       <h2>Order: ${bill.orderNumber}</h2>
  //       <div class="row"><span class="label">Bill Number:</span><span>${bill.billNumber}</span></div>
  //       <div class="row"><span class="label">Date:</span><span>${new Date(bill.date).toLocaleDateString('en-GB')}</span></div>
  //       <div class="row"><span class="label">Customer Name:</span><span>${bill.customerName}</span></div>

  //       <table>
  //         <thead>
  //           <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
  //         </thead>
  //         <tbody>
  //           ${itemRows}
  //         </tbody>
  //       </table>

  //       <div class="row"><span class="label">Total:</span><span>₹${bill.total.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">CustomerPays:</span><span>₹${bill.customerPays.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">BalanceReturned:</span><span>₹${bill.remaining.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">Status:</span><span>${bill.status}</span></div>

  //       <hr />
  //       <p style="text-align: center;">Thank you!</p>
  //     </body>
  //   </html>
  // `);

  //   printWindow.document.close();
  //   printWindow.print();
  // }
  // printBill(bill: any) {
  //   const printWindow = window.open('', '', 'width=600,height=700');
  //   if (!printWindow) return;

  //   interface BillItem {
  //     name: string;
  //     qty: number;
  //     price: number;
  //   }

  //   const itemRows: string = (bill.items as BillItem[]).map((item: BillItem) => `
  //   <tr>
  //     <td style="text-align: left; padding: 8px;">${item.name}</td>
  //     <td style="text-align: right; padding: 8px;">${item.qty}</td>
  //     <td style="text-align: right; padding: 8px;">₹${item.price.toFixed(2)}</td>
  //     <td style="text-align: right; padding: 8px;">₹${(item.qty * item.price).toFixed(2)}</td>
  //   </tr>
  // `).join('');

  //   printWindow.document.write(`
  //   <html>
  //     <head>
  //       <title>Print Bill</title>
  //       <style>
  //         body { font-family: Arial, sans-serif; padding: 20px; }
  //         h2 { text-align: center; margin: 0 0 10px 0; font-weight: bold; }
  //         h3 { margin-bottom: 20px; text-align: center; }
  //         .row { display: flex; justify-content: space-between; margin: 6px 0; }
  //         .label { font-weight: bold; }
  //         table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  //         th, td { border: 1px solid #ccc; padding: 8px; }
  //         th { text-align: left; background: #f9f9f9; }
  //         td:nth-child(2), td:nth-child(3), td:nth-child(4) {
  //           text-align: right;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <h2>ANBUKODI AGRO TRADERS</h2>
  //       <h3>Order: ${bill.orderNumber || 'CUSTOM BILL'}</h3>

  //       <div class="row"><span class="label">Bill Number:</span><span>${bill.billNumber}</span></div>
  //       <div class="row"><span class="label">Date:</span><span>${new Date(bill.date).toLocaleDateString('en-GB')}</span></div>
  //       <div class="row"><span class="label">Customer Name:</span><span>${bill.customerName}</span></div>

  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Item</th>
  //             <th>Qty</th>
  //             <th>Price</th>
  //             <th>Total</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           ${itemRows}
  //         </tbody>
  //       </table>

  //       <div class="row"><span class="label">Total:</span><span>₹${bill.total.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">CustomerPays:</span><span>₹${bill.customerPays.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">BalanceReturned:</span><span>₹${bill.remaining.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">Status:</span><span>${bill.status}</span></div>

  //       <hr />
  //       <p style="text-align: center;">Thank you!</p>
  //     </body>
  //   </html>
  // `);

  //   printWindow.document.close();
  //   printWindow.print();
  // }

  printBill(bill: any) {
    const printWindow = window.open('', '', 'width=600,height=700');
    if (!printWindow) return;

    interface BillItem {
      name: string;
      qty: number;
      price: number;
    }

    const items = bill.items as BillItem[] || [];

    const itemRows: string = items.map((item: BillItem) => `
    <tr>
      <td style="text-align: left; padding: 8px;">${item.name}</td>
      <td style="text-align: right; padding: 8px;">${item.qty}</td>
      <td style="text-align: right; padding: 8px;">₹${item.price.toFixed(2)}</td>
      <td style="text-align: right; padding: 8px;">₹${(item.qty * item.price).toFixed(2)}</td>
    </tr>
  `).join('');

    const itemsTableHTML = items.length > 0 ? `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>
  ` : '';

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Bill</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { text-align: center; margin: 0 0 10px 0; font-weight: bold; }
          h3 { margin-bottom: 20px; text-align: center; }
          .row { display: flex; justify-content: space-between; margin: 6px 0; }
          .label { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ccc; padding: 8px; }
          th { text-align: left; background: #f9f9f9; }
          td:nth-child(2), td:nth-child(3), td:nth-child(4) {
            text-align: right;
          }
        </style>
      </head>
      <body>
        <h2>ANBUKODI AGRO TRADERS</h2>
        <h3>Order: ${bill.orderNumber || 'CUSTOM BILL'}</h3>

        <div class="row"><span class="label">Bill Number:</span><span>${bill.billNumber}</span></div>
        <div class="row"><span class="label">Date:</span><span>${new Date(bill.date).toLocaleDateString('en-GB')}</span></div>
        <div class="row"><span class="label">Customer Name:</span><span>${bill.customerName}</span></div>

        ${itemsTableHTML}

        <div class="row"><span class="label">Total:</span><span>₹${bill.total.toFixed(2)}</span></div>
        <div class="row"><span class="label">CustomerPays:</span><span>₹${bill.customerPays.toFixed(2)}</span></div>
        <div class="row"><span class="label">BalanceReturned:</span><span>₹${bill.remaining.toFixed(2)}</span></div>
        <div class="row"><span class="label">Status:</span><span>${bill.status}</span></div>

        <hr />
        <p style="text-align: center;">Thank you!</p>
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.print();
  }



  getStatusColor(status: string) {
    switch (status.toUpperCase()) {
      case 'PAID': return '#d4f5d3';
      case 'Cash': return '#e0ecff';
      case 'On Account': return '#ffe0e0';
      case 'DRAFT': return '#f0f0f0';
      default: return '#eee';
    }
  }
  formatStatusClass(status: string): string {
    return status.toLowerCase().replace(/\s+/g, '');
  }
}
