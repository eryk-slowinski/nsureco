import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
})
export class SearchCustomerComponent {
  constructor(private customerService: CustomerService) { }

  searchResults: Customer[];
  customer: Customer = new Customer();

  searchForm = new FormGroup({
    searchBy: new FormControl('name', Validators.required),
    searchValue: new FormControl(null, Validators.required)
  })

  async search() {
    this.customer.name = null;
    this.customer.pesel = null;
    this.customer.id = null;
    this.customer[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
    this.searchResults = await this.customerService.searchCustomer(this.customer).then();
  }

  selectCustomer(customer: Object) {
    this.customerService.customerSelected.next(customer);
  }
}
