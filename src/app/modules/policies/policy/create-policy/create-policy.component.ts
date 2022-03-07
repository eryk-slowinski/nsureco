import { Component, OnInit } from '@angular/core';
import { PolicyComponent } from '../policy.component';
import { DatePipe } from '@angular/common';
import { InsuredObject } from 'src/app/models/insuredObject';

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
    await this.createRequiredObjects();
  }

  async createRequiredObjects() {
    await this.createPolicyLine();
    await this.createInsuredVehicle();
    await this.createInsuredDriver();
  }

  async createInsuredVehicle() {
    this.vehicleObject.policyLineId = this.policyLine.id;
    this.vehicleObject.transactionId = this.transaction.id;
    this.vehicleObject.type = 'VEH';
    this.vehicleObject.version = this.policy.version;
    this.vehicleObject = await this.policyService
      .createInsuredObject(this.vehicleObject)
      .then();
    await this.createRisks(this.vehicleObject);
    await this.reloadCoverages(this.vehicleObject);
    this.risks.sort((a, b) => a.riskId.localeCompare(b.riskId));
  }

  async createInsuredDriver() {
    this.driverObject.policyLineId = this.policyLine.id;
    this.driverObject.transactionId = this.transaction.id;
    this.driverObject.type = 'DRI';
    this.driverObject.version = this.policyLine.version;
    this.driverObject.n01 = this.customerSelected['id'];
    this.driverObject = await this.policyService.createInsuredObject(this.driverObject).then();
  }

  async createRisks(object: InsuredObject) {
    await this.getRisksConfig(object);
    this.objectRisksConfig.forEach(async (element) => {
      if (element.version === this.policy.version) {
        this.risk.riskId = element.riskId;
        this.risk.objectId = object.id;
        this.risk.isSelected = 'false';
        await this.policyService.createRisks(this.risk).then();
      }
    });
    await this.delay(300);
  }

  ngOnInit() {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.customerService.customerSelected.next(this.customerSelected);
  }

}
