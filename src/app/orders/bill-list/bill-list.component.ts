import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";

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

  // printBills(bill: any) {
  //   const printWindow = window.open('', '', 'width=600,height=700');
  //   if (!printWindow) return;

  //   interface BillItem {
  //     name: string;
  //     qty: number;
  //     price: number;
  //   }

  //   const items = bill.items as BillItem[] || [];

  //   const itemRows: string = items.map((item: BillItem) => `
  //   <tr>
  //     <td style="text-align: left; padding: 8px;">${item.name}</td>
  //     <td style="text-align: right; padding: 8px;">${item.qty}</td>
  //     <td style="text-align: right; padding: 8px;">₹${item.price.toFixed(2)}</td>
  //     <td style="text-align: right; padding: 8px;">₹${(item.qty * item.price).toFixed(2)}</td>
  //   </tr>
  // `).join('');

  //   const itemsTableHTML = items.length > 0 ? `
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Item</th>
  //         <th>Qty</th>
  //         <th>Price</th>
  //         <th>Total</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       ${itemRows}
  //     </tbody>
  //   </table>
  // ` : '';

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

  //       ${itemsTableHTML}

  //       <div class="row"><span class="label">Total:</span><span>₹${bill.total.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">Customer Pays:</span><span>₹${bill.customerPays.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">Balance Returned:</span><span>₹${bill.remaining.toFixed(2)}</span></div>
  //       <div class="row"><span class="label">Status:</span><span>${bill.status}</span></div>

  //       <hr />
  //       <p style="text-align: center;">Thank you!</p>
  //     </body>
  //   </html>
  // `);

  //   printWindow.document.close();
  //   printWindow.print();
  // }

  async printBill(bill: any) {
    const billElement = document.createElement('div');
    billElement.style.width = '80mm';
    billElement.style.padding = '10px';
    billElement.style.fontFamily = "'Latha', 'Noto Sans Tamil', 'Arial Unicode MS', sans-serif";
    billElement.style.fontSize = '11px';
    billElement.style.lineHeight = '1.5';
    billElement.style.fontWeight = '500'; // slightly bolder for better print clarity
    billElement.style.backgroundColor = '#fff';
    billElement.style.color = '#000';

    const itemsHTML = bill.items.map((item: any) => `
    <tr>
      <td style="border: 1px solid #000; padding: 4px; text-align: left;">${item.name}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${item.qty}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: right;">₹${item.price.toFixed(2)}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: right;">₹${(item.qty * item.price).toFixed(2)}</td>
    </tr>
  `).join('');

    billElement.innerHTML = `
    <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 4px;">
      அன்புகொடி அக்ரோ டிரேடர்ஸ்
    </div>
    <div style="text-align: justify; margin-bottom: 4px;">
      விதை, உரம், பூச்சி மருந்து, மாட்டுத் தீவனம் மற்றும் நவதானிய வியாபாரம் (நவதானிய விற்பனை மற்றும் கொள்முதல் நிலையம்) <br>
      உரிமையாளர்:&nbspT.பாலமுருகன் Cell:&nbsp93422&nbsp62857,&nbsp88706&nbsp17061 <br>
      முகவரி: 3/280, கயத்தார்–தேவர்குளம் மெயின் ரோடு, மேல இலந்தைக்குளம் – 627951
    </div>
    <div style="text-align: center; font-weight: bold; margin-bottom: 6px;">
      GSTIN: 33CTFPN8936E1ZI
    </div>
    <div style="text-align: center; font-weight: bold; margin-bottom: 6px;">
      ${bill.orderNumber ? 'Order: ' + bill.orderNumber : 'CUSTOM BILL'}
    </div>
    <div style="margin-bottom: 4px;">Bill No: ${bill.billNumber}</div>
    <div style="margin-bottom: 4px;">Date: ${new Date(bill.date).toLocaleDateString('en-GB')}</div>
    <div style="margin-bottom: 4px;">Customer: ${bill.customerName}</div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px;">
      <thead>
        <tr style="font-weight: bold;">
          <th style="border: 1px solid #000; padding: 4px; text-align: left;">Item</th>
          <th style="border: 1px solid #000; padding: 4px; text-align: center;">Qty</th>
          <th style="border: 1px solid #000; padding: 4px; text-align: right;">Rate</th>
          <th style="border: 1px solid #000; padding: 4px; text-align: right;">Amt</th>
        </tr>
      </thead>
      <tbody>${itemsHTML}</tbody>
    </table>
    <div style="display: flex; justify-content: flex-end; font-weight: bold; font-size: 13px; margin-top: 2px;">Total Amount: ₹${bill.total.toFixed(2)}</div>
    <div>Total Items: ${bill.items.length}</div>
    <div>Customer Pays: ₹${bill.customerPays.toFixed(2)}</div>
    <div>Balance Returned: ₹${bill.remaining.toFixed(2)}</div>
    <div>Status: ${bill.status}</div>
    <div style="text-align: center; font-weight: bold; margin-top: 4px;">
      ***நன்றி மீண்டும் வருக***
    </div>
  `;

    document.body.appendChild(billElement);

    // Higher scale for sharper text
    const canvas = await html2canvas(billElement, { scale: 3 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', [80, billElement.offsetHeight * 0.2645]); // 80mm width
    pdf.addImage(imgData, 'PNG', 0, 0, 80, billElement.offsetHeight * 0.2645, undefined, 'FAST');

    document.body.removeChild(billElement);

    const pdfBlob = pdf.output('blob');

    if (navigator.share) {
      const file = new File([pdfBlob], 'bill.pdf', { type: 'application/pdf' });
      await navigator.share({ files: [file], title: 'Bill', text: 'Your bill is ready.' });
    } else {
      pdf.save('bill.pdf');
    }
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
