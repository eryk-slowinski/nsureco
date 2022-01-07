import { Customers } from './../../../models/customers';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent implements OnInit {
  constructor(private customerService: CustomerService) { }

  customer: Customers = new Customers();
  error: string;
  success: string;

  createCustomerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    birthDate: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    pesel: new FormControl(null, Validators.required),
    phoneNum: new FormControl(null, Validators.required),
  });

  async createCustomer() {
    this.customer.name = this.createCustomerForm.value.name;
    this.customer.birthDate = this.createCustomerForm.value.birthDate;
    this.customer.pesel = this.createCustomerForm.value.pesel;
    this.customer.address = this.createCustomerForm.value.address;
    this.customer.phoneNum = this.createCustomerForm.value.phoneNum;
    this.error = null;
    this.success = null;
    await this.customerService.createCustomer(this.customer).then().catch(
      (error) => this.error = error.error);
    if (this.error == null) {
      this.success = 'Customer successfully created';
      let customers = await this.customerService.searchCustomer(this.customer).then();
      this.customerService.customerSelected.next(customers[0]);
    }
  }

  get name() {
    return this.createCustomerForm.get('name');
  }

  get birth_date() {
    return this.createCustomerForm.get('birthDate');
  }

  get address() {
    return this.createCustomerForm.get('address');
  }

  get pesel() {
    return this.createCustomerForm.get('pesel');
  }

  get phone_num() {
    return this.createCustomerForm.get('phoneNum');
  }

  ngOnInit(): void { }
}
