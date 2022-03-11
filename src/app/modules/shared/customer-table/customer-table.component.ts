import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  constructor(public customerService: CustomerService) { }
  customerSelected: Object = new Object();

  ngOnInit(): void {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.customerService.customerSelected.next(this.customerSelected);
  }
}

