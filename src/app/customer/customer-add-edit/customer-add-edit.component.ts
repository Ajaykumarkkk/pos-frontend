// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-customer-add-edit',
//   templateUrl: './customer-add-edit.component.html',
//   styleUrls: ['./customer-add-edit.component.scss']
// })
// export class CustomerAddEditComponent {

// }






import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      totalSpent: [0, Validators.required],
      lastVisit: ['', Validators.required],
      customerSince: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      // Submit logic here
    }
  }
}
