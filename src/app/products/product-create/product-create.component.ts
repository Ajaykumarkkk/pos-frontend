// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-product-create',
//   templateUrl: './product-create.component.html',
//   styleUrls: ['./product-create.component.scss']
// })

// export class ProductCreateComponent implements OnInit {
//   productForm!: FormGroup;
//   categories: string[] = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Health'];
//   selectedImage: File | null = null;
//   previewUrl: string | ArrayBuffer | null = null;




//   constructor(private productService: ProductService, private fb: FormBuilder, private router: Router) { }

//   ngOnInit(): void {
//     this.productForm = this.fb.group({
//       productName: ['', Validators.required],
//       category: ['', Validators.required],
//       description: ['', Validators.required],
//       price: [0, [Validators.required, Validators.min(0)]],
//       sku: ['', Validators.required],
//       barcode: [''],
//       stockQuantity: [0, [Validators.required, Validators.min(0)]],
//       lowStockThreshold: [5, [Validators.required, Validators.min(0)]],
//       inventoryStatus: ['In Stock', Validators.required],
//     });
//   }

//   onSubmit(): void {
//     if (this.productForm.valid) {
//       // const newProduct = this.productForm.value;
//       // console.log('Saving product:', newProduct);

//       const formValues = this.productForm.value;

//       const formData = new FormData();
//       formData.append('productName', formValues.productName);
//       formData.append('category', formValues.category);
//       formData.append('description', formValues.description);
//       formData.append('price', formValues.price);
//       formData.append('sku', formValues.sku);
//       formData.append('barcode', formValues.barcode || '');
//       formData.append('stockQuantity', formValues.stockQuantity);
//       formData.append('lowStockThreshold', formValues.lowStockThreshold);
//       formData.append('inventoryStatus', formValues.inventoryStatus);

//       if (this.selectedImage) {
//         formData.append('image', this.selectedImage);
//       }

//       console.log('Submitting product with image:', formData);

//       // TODO: Replace this with your actual API call
//       // this.productService.createProduct(formData).subscribe(
//       //   (response) => {
//       //     console.log('Product created successfully', response);
//       //     this.router.navigate(['/products']);
//       //   },
//       //   (error) => {
//       //     console.error('Error creating product', error);
//       //   }
//       // );

//       // this.productService.createProduct(formData).subscribe({
//       //   next: (res: any) => {
//       //     console.log('Registration successful', res);
//       //     alert('Registration successful');
//       //     this.router.navigate(['/login']);
//       //   },
//       //   error: (err) => {
//       //     console.error('Registration failed', err);
//       //     alert('Registration failed. Please try again.');
//       //   },
//       // });
//       this.productService.createProduct(formData).subscribe({
//         next: (response) => {
//           console.log('Product created successfully:', response);
//           this.router.navigate(['/products']);
//         },
//         error: (error) => {
//           console.error('Error creating product:', error);
//         }
//       });
//     } else {
//       this.productForm.markAllAsTouched();
//     }
//   }

//   onCancel(): void {
//     this.router.navigate(['/products']);
//   }
//   selectedFile: File | null = null;
//   onImageSelected(event: Event): void {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       this.selectedImage = file;

//       const reader = new FileReader();
//       reader.onload = () => {
//         this.previewUrl = reader.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }



//   uploadToGoogleDrive() {
//     console.log('Uploading to Google Drive...');

//     const file = this.selectedImage;
//     if (!file) return;

//     console.log('Uploading to Google Drive...76');

//     const metadata = {
//       name: file.name,
//       mimeType: file.type
//     };

//     const form = new FormData();
//     form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
//     form.append('file', file);

//   }
// }





// Updated product-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  // categories: string[] = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Health'];
  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  productId: number | null = null; // to hold the id if editing
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      // category: ['', Validators.required],
      description: [''],
      price: [, [Validators.required, Validators.min(0)]],
      sku: ['', Validators.required],
      barcode: [''],
      stockQuantity: [, [Validators.required, Validators.min(0)]],
      lowStockThreshold: [5, [Validators.required, Validators.min(0)]],
      inventoryStatus: ['In Stock', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(productId: number): void {
    this.productService.getOneProduct(productId).subscribe({
      next: (response: any) => {
        console.log('Product loaded:', response);

        const product = response.products;

        // Patch form values
        this.productForm.patchValue({
          productName: product.productName,
          // category: product.category,
          description: product.description,
          price: product.price,
          sku: product.sku,
          barcode: product.barcode,
          stockQuantity: product.stockQuantity,
          lowStockThreshold: product.lowStockThreshold,
          inventoryStatus: product.inventoryStatus
        });

        // Show image preview if driveFileUrl exists
        if (product.driveFileUrl && product.driveFileId) {
          // this.previewUrl = product.driveFileUrl;
          this.previewUrl = `https://drive.google.com/thumbnail?id=${product.driveFileId}&sz=s800` || 'https://via.placeholder.com/150';
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
      }
    });
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const formValues = this.productForm.value;
      const formData = new FormData();
      Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      if (this.productId) {
        this.productService.updateProduct(this.productId, formData).subscribe({
          next: (response) => {
            console.log('Product updated successfully:', response);
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Error updating product:', error);
          }
        });
      } else {
        this.productService.createProduct(formData).subscribe({
          next: (response) => {
            console.log('Product created successfully:', response);
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Error creating product:', error);
          }
        });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadToGoogleDrive() {
    if (!this.selectedImage) return;
    const metadata = {
      name: this.selectedImage.name,
      mimeType: this.selectedImage.type
    };
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', this.selectedImage);
    console.log('Uploading to Google Drive...');
  }
}




