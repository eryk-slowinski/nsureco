import { PolicyService } from 'src/app/services/policy.service';
import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/models/policy';
import { CustomerService } from 'src/app/services/customer.service';
import { Customers } from 'src/app/models/customers';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  constructor(private customerService: CustomerService, private policyService: PolicyService) { }
  datepipe: DatePipe = new DatePipe('en-US');
  customerSelected: Object = new Object();
  policySelected: Object = new Object();
  policy: Policy = new Policy();
  policiesList: Policy[];
  editState: boolean = false;
  customer: Customers = new Customers();
  error: string;
  success: string;

  async chooseCustomer() {
    if (this.customerSelected['customerId']) {
      this.customer.customerId = this.customerSelected['customerId'];
      this.customer = await this.customerService.searchCustomer(this.customer).then()
      this.customer = this.customer[0];
      this.customer.birthDate = this.datepipe.transform(this.customer.birthDate, 'yyyy-MM-dd');
    }
  }

  async searchPolicy() {
    this.policy.ownerId = this.customerSelected['customerId'];
    this.policiesList = await this.policyService.searchPolicy(this.policy).then();
    this.policiesList.sort((a, b) => b.policyId - a.policyId)
  }

  async modifyCustomer() {
    this.error = null;
    this.success = null;
    await this.customerService.modifyCustomer(this.customer).then().catch((error) => this.error = error.error);
    if (this.error == null) {
      this.customer = await this.customerService.modifyCustomer(this.customer).then();
      this.customer.birthDate = this.datepipe.transform(this.customer.birthDate, 'yyyy-MM-dd');
      this.editState = false;
    };
  }

  editPolicy(policySelected: Object) {
    this.policyService.policySelected.next(policySelected);
  }

  ngOnInit(): void {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.searchPolicy();
    this.chooseCustomer();
  }
}
