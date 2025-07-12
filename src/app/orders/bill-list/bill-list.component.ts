// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-bill-list',
//   templateUrl: './bill-list.component.html',
//   styleUrls: ['./bill-list.component.scss']
// })
// export class BillListComponent {

// }




import { Component } from '@angular/core';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent {
  searchTerm = '';
  selectedBill: any = null;
  showModal = false;

  bills = [
    {
      billNumber: 'BILL-20230522-001',
      orderNumber: 'ORD-20230522-001',
      date: new Date('2023-05-22'),
      dueDate: null,
      total: 125.5,
      remaining: 0,
      status: 'PAID'
    },
    {
      billNumber: 'BILL-20230521-002',
      orderNumber: 'ORD-20230521-002',
      date: new Date('2023-05-21'),
      dueDate: null,
      total: 75.25,
      remaining: 0,
      status: 'PAID'
    },
    {
      billNumber: 'BILL-20230520-003',
      orderNumber: 'ORD-20230520-003',
      date: new Date('2023-05-20'),
      dueDate: new Date('2023-06-20'),
      total: 200.75,
      remaining: 150.75,
      status: 'OPEN'
    },
    {
      billNumber: 'BILL-20230519-004',
      orderNumber: 'ORD-20230519-004',
      date: new Date('2023-05-19'),
      dueDate: new Date('2023-05-29'),
      total: 320.5,
      remaining: 320.5,
      status: 'OVERDUE'
    },
    {
      billNumber: 'BILL-20230518-005',
      orderNumber: 'ORD-20230518-005',
      date: new Date('2023-05-18'),
      dueDate: null,
      total: 150,
      remaining: 150,
      status: 'DRAFT'
    }
  ];

  get filteredBills() {
    return this.bills.filter(bill =>
      bill.billNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      bill.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(bill: any) {
    this.selectedBill = bill;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBill = null;
  }

  printBill(bill: any) {
    const printWindow = window.open('', '', 'width=600,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { margin-top: 0; }
            .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .label { font-weight: bold; }
            .status {
              padding: 4px 10px;
              border-radius: 10px;
              font-weight: bold;
              background-color: ${this.getStatusColor(bill.status)};
            }
          </style>
        </head>
        <body>
          <h2>${bill.orderNumber}</h2>
          <div class="row"><span class="label">Customer:</span><span>John Doe</span></div>
          <div class="row"><span class="label">Date:</span><span>${bill.date.toDateString()}</span></div>
          <div class="row"><span class="label">Status:</span><span class="status">${bill.status}</span></div>
          <div class="row"><span class="label">Total:</span><span>$${bill.total.toFixed(2)}</span></div>
          <div class="row"><span class="label">Remaining:</span><span>$${bill.remaining.toFixed(2)}</span></div>
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
      case 'OPEN': return '#e0ecff';
      case 'OVERDUE': return '#ffe0e0';
      case 'DRAFT': return '#f0f0f0';
      default: return '#eee';
    }
  }
}
