
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  viewMode: 'grid' | 'table' = 'grid';

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts(); // Load real API data
  }

  loadProducts() {
    this.productService.getAllProduct().subscribe({
      next: (res: any) => {
        if (res.success && res.products?.rows) {
          this.products = res.products.rows.map((item: any) => ({
            id: item.id,
            name: item.productName || 'Unnamed Product',
            price: item.price || 0,
            stock: item.stockQuantity || 0,
            // imageUrl: item.driveFileUrl || 'https://via.placeholder.com/150'
            // imageUrl: `https://drive.google.com/uc?export=view&id=${item.driveFileId}` || 'https://via.placeholder.com/150'
            // imageUrl: `https://lh3.googleusercontent.com/d/${item.driveFileId}` || 'https://via.placeholder.com/150'
            // imageUrl: `https://drive.google.com/thumbnail?id=${item.driveFileId}&sz=s800` || 'https://via.placeholder.com/150'
            imageUrl: item.driveFileUrl || 'https://via.placeholder.com/150'
            // <img src="https://drive.google.com/thumbnail?id=FILE_ID&sz=s800" alt="Thumbnai Image">
          }));
          console.log('Products loaded:', this.products);
        }
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  toggleView(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  addProduct() {
    this.router.navigate(['products/create']);
  }
  editProduct(productId: number): void {
    this.router.navigate(['products/edit', productId]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== productId);
        },
        error: (err) => {
          console.error('Failed to delete product:', err);
        }
      });
    }
  }


}
