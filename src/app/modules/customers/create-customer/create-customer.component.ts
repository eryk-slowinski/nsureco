import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  createCustomerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    birth_date: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    pesel: new FormControl(null, Validators.required),
    phone_num: new FormControl(null, Validators.required),
  });

  onSubmit(createCustomerForm: FormGroup) {
    console.log(createCustomerForm.value);
    this.customerService.addCustomer(createCustomerForm);
  }

  get name() {
    return this.createCustomerForm.get('name');
  }

  get birth_date() {
    return this.createCustomerForm.get('birth_date');
  }

  get address() {
    return this.createCustomerForm.get('address');
  }

  get pesel() {
    return this.createCustomerForm.get('pesel');
  }

  get phone_num() {
    return this.createCustomerForm.get('phone_num');
  }

  ngOnInit(): void {}
}
