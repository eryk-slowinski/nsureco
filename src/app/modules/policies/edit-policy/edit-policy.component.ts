import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreatePolicyComponent } from './../create-policy/create-policy.component';
import { CustomerService } from './../../../services/customer.service';
import { PolicyService } from 'src/app/services/policy.service';
//models
import { InsuredObject } from './../../../models/insuredObject';


@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent extends CreatePolicyComponent implements OnInit {

  constructor(public policyService: PolicyService, public customerService: CustomerService) { super(policyService, customerService); }
  policySelected: Object = new Object();
  customerSelected: Object = new Object();
  insuredVehicle: InsuredObject = new InsuredObject();
  insuredDriver: InsuredObject = new InsuredObject();
  editState: boolean = false;
  driversLicenceDate: Date = new Date();

  async getPolicy() {
    this.policy = await this.policyService.getPolicy(this.policySelected).then();
  }

  async getPolicyLine() {
    this.choosePolicyLine(this.policy.productType);
    this.policyLine.policyId = this.policySelected['policyId'];
    this.policyLine.transactionId = this.policySelected['transactionId'];
    this.policyLine = await this.policyService.getPolicyLine(this.policyLine).then();
  }

  async getInsuredVehicle() {
    this.insuredVehicle.policyLineId = this.policyLine.policyLineId;
    this.insuredVehicle.type = 'VEH';
    this.insuredVehicle = await this.policyService.searchInsuredObject(this.insuredVehicle).then();
    this.insuredVehicle.d01 = this.insuredVehicle.d01.slice(0, 10);
  }

  async getInsuredDriver() {
    this.insuredDriver.policyLineId = this.policyLine.policyLineId;
    this.insuredDriver.type = 'DRI';
    this.insuredDriver = await this.policyService.searchInsuredObject(this.insuredDriver).then();
    this.insuredDriver.d01 = this.insuredDriver.d01.slice(0, 10);
  }

  async getVehicle() {
    this.vehicle.vehicleId = this.insuredVehicle.n01;
    this.vehicle = await this.policyService.searchVehicle(this.vehicle).then();
  }

  async getAllData() {
    await this.getPolicy();
    await this.getPolicyLine();
    await this.getInsuredVehicle()
    await this.getInsuredDriver();
    await this.getVehicle();
    await this.reloadCoverages(this.insuredVehicle);
  }

  async updatePolicy() {
    await this.policyService.updatePolicy(this.policy).then();
    await this.resetCoverages();
  }

  async updatePolicyLine() {
    await this.policyService.updatePolicyLine(this.policyLine);
    await this.resetCoverages();
  }

  async updateInsuredVehicle() {
    this.vehicle = await this.policyService.searchVehicle(this.vehicle).then();
    this.insuredVehicle.n01 = this.vehicles.vehicleId[0];
    await this.policyService.updateInsuredObject(this.insuredVehicle).then();
    await this.getVehicle();
    await this.resetCoverages();
  }

  async updateInsuredDriver() {
    await this.policyService.updateInsuredObject(this.insuredDriver).then();
    await this.resetCoverages();
  }

  async resetCoverages() {
    this.risks.forEach(async (risk) => {
      risk.isSelected = 'false';
      risk.premium = null;
      risk.premiumForPeriod = null;
      this.totalPremium = 0;
      await this.policyService.changeCoverage(risk).then();
    })
  }

  ngOnInit(): void {
    this.policyService.policySelected.subscribe((policy) => {
      this.policySelected = policy;
    });
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.getAllData();
    this.chooseProduct();
    this.getRisksConfig(this.insuredVehicle);
  }
}
