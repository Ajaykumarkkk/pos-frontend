import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

interface customer {
  name: string;
  id: number;
  email: string;
  phone: string;
  receivableFromCustomer: string;
  payableToCustomer: string;
  active: true
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  searchTerm = '';
  currentPage = 1;
  pageSize = 5;

  // customers = [
  //   {
  //     name: 'John Doe',
  //     // email: 'john.doe@example.com',
  //     phone: '+1 (555) 123-4567',
  //     receivableFromCustomer: new Date('2023-05-15'),
  //     payableToCustomer: new Date('2022-01-10'),
  //     active: true
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '+1 (555) 987-6543',
  //     receivableFromCustomer: new Date('2023-05-20'),
  //     payableToCustomer: new Date('2022-02-15'),
  //     active: true
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '+1 (555) 987-6543',
  //     receivableFromCustomer: new Date('2023-05-20'),
  //     payableToCustomer: new Date('2022-02-15'),
  //     active: true
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '+1 (0000) 987-6543',
  //     receivableFromCustomer: new Date('2023-05-20'),
  //     payableToCustomer: new Date('2022-02-15'),
  //     active: true
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '+1 (555) 987-6543',
  //     receivableFromCustomer: new Date('2023-05-20'),
  //     payableToCustomer: new Date('2022-02-15'),
  //     active: true
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '+1 (555) 987-6543',
  //     receivableFromCustomer: new Date('2023-05-20'),
  //     payableToCustomer: new Date('2022-02-15'),
  //     active: true
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '+1 (555) 987-6543',
  //     receivableFromCustomer: new Date('2023-05-20'),
  //     payableToCustomer: new Date('2022-02-15'),
  //     active: true
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '+1 (555) 987-6543',
  //     receivableFromCustomer: new Date('2023-05-20'),
  //     payableToCustomer: new Date('2022-02-15'),
  //     active: false
  //   },
  //   // Add more customers here as needed...
  // ];
  customers: customer[] = [];

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadProducts(); // Load real API data
  }

  loadProducts() {
    this.customerService.getAllCustomers().subscribe({
      next: (res: any) => {
        if (res.success && res.customers) {
          this.customers = res.customers.map((item: any) => ({
            id: item.id || 0, // Ensure id is always a number
            name: item.name || 'Unnamed',
            email: item.email || '',
            phone: item.phone || '',
            receivableFromCustomer: item.receivableFromCustomer || '0',
            payableToCustomer: item.payableToCustomer || '0',
            active: item.active ?? true // fallback to true if undefined
          }));
          console.log('Customer list loaded:', this.customers);
        }
      },
      error: (err) => {
        console.error('Failed to load customers:', err);
      }
    });
  }

  get filteredCustomers() {
    const term = this.searchTerm.toLowerCase();
    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(term) ||
      customer.phone.toLowerCase().includes(term)
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
    console.log("customer.id", customer);

    this.router.navigate(['/customers/edit', customer.id]); // Replace with actual ID if available
  }

  deleteCustomer(customer: any) {
    const confirmDelete = confirm(`Delete ${customer.name}?`);
    if (confirmDelete) {
      this.customers = this.customers.filter(c => c !== customer);
    }
  }
}
