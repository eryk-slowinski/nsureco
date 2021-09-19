import { CustomerService } from '../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
})
export class SearchCustomerComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  searchResults: [];
  // searchResultsObs: Subject<[]> = new Subject<[]>();

  searchForm = new FormGroup({
    searchBy: new FormControl('name', Validators.required),
    searchValue: new FormControl(null, Validators.required),
  });

  // async onSubmit() {
  //   this.searchResults = await this.customerService.searchCustomer(this.searchForm).then();
  // }

  onSubmit() {
    // this.customerService.searchCustomer(this.searchForm).subscribe((data) => {
    //   this.searchResults = data;
    // })
  }

  // public selectCustomer(customer: Object) {
  //   this.customerService.selectCustomer(customer);
  // }

  ngOnInit(): void {}
}
