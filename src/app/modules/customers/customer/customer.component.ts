import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  constructor(private customerService: CustomerService) {}

  selectedCustomer: [];

  ngOnInit(): void {
    // this.customerService.searchCustomer(this.searchForm).subscribe((data) => {
    //   this.searchResults = data;
    // })
  }
}
