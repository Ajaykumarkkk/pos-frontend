// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-customer-list',
// //   templateUrl: './customer-list.component.html',
// //   styleUrls: ['./customer-list.component.scss']
// // })
// // export class CustomerListComponent {

// // }






// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-customer-list',
//   templateUrl: './customer-list.component.html',
//   styleUrls: ['./customer-list.component.scss']
// })
// export class CustomerListComponent {
//   searchTerm = '';

//   customers = [
//     {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '+1 (555) 123-4567',
//       totalSpent: 1250.75,
//       lastVisit: new Date('2023-05-15'),
//       customerSince: new Date('2022-01-10')
//     },
//     {
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       phone: '+1 (555) 987-6543',
//       totalSpent: 3420.50,
//       lastVisit: new Date('2023-05-20'),
//       customerSince: new Date('2022-02-15')
//     },
//     // Add other customers...
//   ];

//   get filteredCustomers() {
//     return this.customers.filter(customer =>
//       customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }







import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  searchTerm = '';
  currentPage = 1;
  pageSize = 5;

  customers = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      totalSpent: 1250.75,
      lastVisit: new Date('2023-05-15'),
      customerSince: new Date('2022-01-10'),
      active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalSpent: 3420.5,
      lastVisit: new Date('2023-05-20'),
      customerSince: new Date('2022-02-15'),
      active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalSpent: 3420.5,
      lastVisit: new Date('2023-05-20'),
      customerSince: new Date('2022-02-15'),
      active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalSpent: 3420.5,
      lastVisit: new Date('2023-05-20'),
      customerSince: new Date('2022-02-15'),
      active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalSpent: 3420.5,
      lastVisit: new Date('2023-05-20'),
      customerSince: new Date('2022-02-15'),
      active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalSpent: 3420.5,
      lastVisit: new Date('2023-05-20'),
      customerSince: new Date('2022-02-15'),
      active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalSpent: 3420.5,
      lastVisit: new Date('2023-05-20'),
      customerSince: new Date('2022-02-15'),
      active: true
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalSpent: 3420.5,
      lastVisit: new Date('2023-05-20'),
      customerSince: new Date('2022-02-15'),
      active: false
    },
    // Add more customers here as needed...
  ];

  constructor(private router: Router) { }

  get filteredCustomers() {
    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.pageSize);
  }

  get paginatedCustomers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCustomers.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  navigateToAddCustomer() {
    this.router.navigate(['/customers/create']);
  }

  editCustomer(customer: any) {
    this.router.navigate(['/customers/edit', customer.name]); // Replace with actual ID if available
  }

  deleteCustomer(customer: any) {
    const confirmDelete = confirm(`Delete ${customer.name}?`);
    if (confirmDelete) {
      this.customers = this.customers.filter(c => c !== customer);
    }
  }
}
