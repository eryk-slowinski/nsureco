import { Component, Input, OnInit } from '@angular/core';
import { PolicyComponent } from '../policy.component';
import { DatePipe } from '@angular/common';
import { Policy } from 'src/app/models/policy';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.css'],
})
export class CreatePolicyComponent extends PolicyComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  datepipe: DatePipe = new DatePipe('en-US');
  customerSelected: Object = new Object();
  driverCreated: boolean = false;
  vehicleCreated: boolean = false;


  setEndDate(date: string) {
    var result = new Date(date);
    result.setFullYear(result.getFullYear() + 1);
    result.setDate(result.getDate() - 1);
    this.endDate = result;
    this.policy.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
  }

  async createPolicyLine() {
    this.policyLine.transactionId = this.transaction.id;
    this.policyLine.policyId = this.policy.id;
    this.policyLine.version = this.policy.version;
    await this.policyService.createPolicyLine(this.policyLine).then();
    this.policyLine = await this.policyService
      .getPolicyLine(this.policyLine)
      .then();
  }

  async createPolicy() {
    await this.createTransaction('create').then();
    this.policy.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    this.policy.transactionId = this.transaction.id;
    this.policy.ownerId = this.customerSelected['id'];
    this.policy.type = 'Vehicle insurance';
    this.policy.status = 'quotation';
    this.policy.altNo = this.policy.productType + this.policy.ownerId;
    this.policy.version = this.products[0].version;
    await this.policyService.createPolicy(this.policy).then();
    this.policy = await this.policyService.getPolicy(this.policy).then();
  }

  ngOnInit() {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.customerService.customerSelected.next(this.customerSelected);
  }

}
