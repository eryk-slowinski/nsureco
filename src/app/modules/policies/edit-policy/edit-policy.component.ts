import { Vehicle } from './../../../models/vehicle';
import { InsuredObject } from './../../../models/insuredObject';
import { CustomerService } from './../../../services/customer.service';
import { PolicyService } from 'src/app/services/policy.service';
import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/models/policy';
import { PolicyLine } from 'src/app/models/policyLine';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent implements OnInit {

  constructor(private policyService: PolicyService, private customerService: CustomerService) { }
  policySelected: Object = new Object();
  customerSelected: Object = new Object();
  policyLine: PolicyLine = new PolicyLine();
  policy: Policy = new Policy();
  insuredVehicle: InsuredObject = new InsuredObject();
  insuredDriver: InsuredObject = new InsuredObject();
  vehicle: Vehicle = new Vehicle();

  async getPolicy() {
    this.policy = await this.policyService.getPolicy(this.policySelected).then();
  }

  async getPolicyLine() {
    this.policyLine.policyId = this.policySelected['policyId'];
    this.policyLine.transactionId = this.policySelected['transactionId'];
    this.policyLine = await this.policyService.getPolicyLine(this.policyLine).then();
  }

  async searchInsuredObjects() {
    this.insuredVehicle.policyLineId = this.policyLine.policyLineId;
    this.insuredVehicle.type = 'VEH';
    this.insuredVehicle = await this.policyService.searchInsuredObject(this.insuredVehicle).then();
    this.insuredDriver.policyLineId = this.policyLine.policyLineId;
    this.insuredDriver.type = 'DRI';
    this.insuredDriver = await this.policyService.searchInsuredObject(this.insuredDriver).then();
  }

  async searchVehicle() {
    this.vehicle.vehicleId = this.insuredVehicle.n01;
    this.vehicle = await this.policyService.searchVehicle(this.vehicle).then();
  }

  async getAllData() {
    await this.getPolicy();
    await this.getPolicyLine();
    await this.searchInsuredObjects();
    await this.searchVehicle();
  }




  async updatePolicy() {
    this.policy.type = 'Quote';
    await this.policyService.updatePolicy(this.policy).then();
  }

  ngOnInit(): void {
    this.policyService.policySelected.subscribe((policy) => {
      this.policySelected = policy;
    });
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.getAllData();
  }
}
