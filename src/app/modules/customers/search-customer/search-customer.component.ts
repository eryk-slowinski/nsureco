import { CustomerService } from '../../../services/customer.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
})
export class SearchCustomerComponent {
  constructor(private customerService: CustomerService) { }

  searchResults: [];

  searchForm = new FormGroup({
    searchBy: new FormControl('name', Validators.required),
    searchValue: new FormControl(null, Validators.required),
  });

  async onSubmit() {
    this.searchResults = await this.customerService
      .searchCustomer(this.searchForm)
      .then();
  }

  selectCustomer(customer: Object) {
    this.customerService.customerSelected.next(customer);
  }
}
