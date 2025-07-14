import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/customer.service';
import { ProductService } from 'src/app/products/product.service';
import { OrdersService } from '../orders.service';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface customer {
  name: string;
  id: number;
}

@Component({
  selector: 'app-order-create-edit',
  templateUrl: './order-create-edit.component.html',
  styleUrls: ['./order-create-edit.component.scss']
})
export class OrderCreateEditComponent {
  products: Product[] = [];
  customers: customer[] = [];
  customerPays: number | null = null;
  paymentMethods = ['Cash', 'On Account', 'Mobile Payment'];


  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private productService: ProductService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadProducts(); // Load real API data
    this.loadCustomers(); // Load real API data
  }

  loadProducts() {
    this.productService.getAllProduct().subscribe({
      next: (res: any) => {
        if (res.success && res.products?.rows) {
          this.products = res.products.rows.map((item: any) => ({
            id: item.id,
            name: (item.productName + ' price -' + item.price) || 'Unnamed Product',
            price: item.price || 0,
            stock: item.stockQuantity || 0
          }));
          console.log('Products loaded:', this.products);
        }
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (res: any) => {
        if (res.success && res.customers) {
          this.customers = res.customers.map((item: any) => ({
            id: item.id || 0, // Ensure id is always a number
            name: (item.name + ' கடன் ' + item.receivableFromCustomer)
          }));
          console.log('Customer list loaded:', this.customers);
        }
      },
      error: (err) => {
        console.error('Failed to load customers:', err);
      }
    });
  }


  selectedProduct: any = null;
  selectedCustomer: any = null;
  quantity: number = 1;
  selectedProducts: any[] = [];
  paymentMethod: string = 'Cash';
  discount: number = 0;
  taxRate: number = 0; // in percentage (default 10%)
  errorMessage: string = '';

  get subtotal() {
    return this.selectedProducts.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  get tax() {
    return (this.subtotal * this.taxRate) / 100;
  }

  get total() {
    return this.subtotal + this.tax - this.discount;
  }

  addProduct() {
    if (this.selectedProduct && this.quantity > 0) {
      this.selectedProducts.push({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        price: this.selectedProduct.price,
        qty: this.quantity,
        total: this.selectedProduct.price * this.quantity
      });
      this.quantity = 1;
      this.selectedProduct = null;
    }
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }

  placeOrder() {
    // Validation check
    if (!this.selectedCustomer) {
      this.errorMessage = 'Please select a customer.';
      return;
    }

    if ((this.total ?? 0) <= 0) {
      this.errorMessage = 'Order total must be greater than zero.';
      return;
    }
    if (((this.customerPays ?? 0) > (this.total ?? 0)) && (this.paymentMethod === 'On Account')) {
      this.errorMessage = 'order total must be greater than Customer pays.';
      return;
    }
    if (!((this.customerPays ?? 0) >= (this.total ?? 0)) && (this.paymentMethod !== 'On Account')) {
      this.errorMessage = 'Customer pays must be greater than or equal to order total.';
      return;
    }

    this.errorMessage = ''; // Clear error on valid input
    const orderPayload = {
      customer: this.selectedCustomer,
      products: this.selectedProducts.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        total: item.total
      })),
      customerPays: this.customerPays,
      balanceReturned: this.balanceReturned,
      paymentMethod: this.paymentMethod,
      subTotal: this.subtotal,
      tax: this.tax,
      discount: this.discount,
      total: this.total
    };

    console.log('Order placed', orderPayload);
    this.ordersService.createOrder(orderPayload).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        console.error('Error creating order:', error);
      }
    });
  }

  cancelOrder() {
    this.selectedProducts = [];
    this.discount = 0;
    this.router.navigate(['/orders']);
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

  get balanceReturned(): number {
    return Math.max((this.customerPays ?? 0) - (this.total ?? 0), 0);
  }
}

