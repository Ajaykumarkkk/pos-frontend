// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CustomerService } from '../customer.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-customer-add-edit',
//   templateUrl: './customer-add-edit.component.html',
//   styleUrls: ['./customer-add-edit.component.scss']
// })
// export class CustomerAddEditComponent implements OnInit {
//   customerForm!: FormGroup;
//   customerId: number | null = null; // to hold the id if editing

//   constructor(
//     private fb: FormBuilder,
//     private customerService: CustomerService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) { }

//   ngOnInit(): void {
//     this.customerForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', Validators.email], // Not required but must be valid if entered
//       phone: ['', [
//         Validators.required,
//         Validators.pattern(/^[0-9]{10}$/)
//       ]],
//       address: [''],
//       payableToCustomer: [''],
//       receivableFromCustomer: ['']
//     });
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('id');
//       if (id) {
//         this.customerId = +id;
//         // this.loadCustomerData(this.customerId);
//       }
//     });
//   }

//   get f() {
//     return this.customerForm.controls;
//   }

//   onSubmit() {
//     if (this.customerForm.valid) {
//       console.log(this.customerForm.value);
//       this.customerService.createCustomer(this.customerForm.value).subscribe({
//         next: (response) => {
//           console.log('Customer created successfully:', response);
//           this.router.navigate(['/customers']);
//         },
//         error: (error) => {
//           console.error('Error creating customer:', error);
//         }
//       });
//     } else {
//       this.customerForm.markAllAsTouched(); // Show all errors
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {
  customerForm!: FormGroup;
  customerId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: [''],
      payableToCustomer: [''],
      receivableFromCustomer: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.customerId = +id;
        this.isEditMode = true;
        this.loadCustomerData(this.customerId);
      }
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  loadCustomerData(id: number) {
    this.customerService.getCustomerById(id).subscribe({
      next: (res) => {
        const customer = res.customer; // Adjust according to your API response
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          payableToCustomer: customer.payableToCustomer,
          receivableFromCustomer: customer.receivableFromCustomer
        });
      },
      error: (err) => {
        console.error('Failed to load customer:', err);
      }
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      if (this.isEditMode && this.customerId) {
        this.customerService.updateCustomer(this.customerId, formData).subscribe({
          next: () => {
            console.log('Customer updated successfully');
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            console.error('Failed to update customer:', err);
          }
        });
      } else {
        this.customerService.createCustomer(formData).subscribe({
          next: () => {
            console.log('Customer created successfully');
            this.router.navigate(['/customers']);
          },
          error: (err) => {
            console.error('Failed to create customer:', err);
          }
        });
      }
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
