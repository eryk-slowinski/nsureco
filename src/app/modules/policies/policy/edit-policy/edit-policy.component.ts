import { Component, OnInit } from '@angular/core';
import { PolicyComponent } from '../policy.component';


@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent extends PolicyComponent implements OnInit {

  policySelected: Object = new Object();
  customerSelected: Object = new Object();
  editState: boolean = false;


  async getPolicy() {
    this.policy = await this.policyService.getPolicy(this.policySelected).then();
  }

  async getPolicyLine() {
    this.choosePolicyLine();
    this.policyLine.policyId = this.policy.id;
    this.policyLine.transactionId = this.policy.transactionId;
    this.policyLine.version = this.policy.version;
    this.policyLine = await this.policyService.getPolicyLine(this.policyLine).then();
  }

  async getInsuredVehicle() {
    this.vehicleObject.policyLineId = this.policyLine.id;
    this.vehicleObject.type = 'VEH';
    this.vehicleObject = await this.policyService.searchInsuredObject(this.vehicleObject).then();
    if (this.vehicleObject.d01) {
      this.vehicleObject.d01 = this.datepipe.transform(this.vehicleObject.d01, 'yyyy-MM-dd');
    }
    if (this.vehicleObject.n01) {
      this.vehicle.id = this.vehicleObject.n01;
      this.vehicle = await this.policyService.searchVehicle(this.vehicle).then();
    }
  }

  async getInsuredDriver() {
    this.driverObject.policyLineId = this.policyLine.id;
    this.driverObject.type = 'DRI';
    this.driverObject = await this.policyService.searchInsuredObject(this.driverObject).then();
    if (this.driverObject.d01) {
      this.driverObject.d01 = this.datepipe.transform(this.driverObject.d01, 'yyyy-MM-dd');
    }
  }

  async getAllObjects() {
    await this.getPolicy();
    await this.chooseProduct()
    await this.getPolicyLine();
    await this.getInsuredVehicle()
    await this.getInsuredDriver();
    await this.reloadCoverages(this.vehicleObject);
  }

  async updateVehicle() {
    if (this.vehicleId) {
      this.vehicleObject.n01 = this.vehicleId;
    }
    await this.policyService.updateInsuredObject(this.vehicleObject).then();
  }

  async updateObjects() {
    await this.updatePolicy();
    await this.updatePolicyLine();
    await this.updateVehicle();
    await this.updateInsuredDriver();
    await this.getAllObjects();
  }

  ngOnInit(): void {
    this.policyService.policySelected.subscribe((policy) => {
      this.policySelected = policy;
    });
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.customerService.customerSelected.next(this.customerSelected);
    this.getAllObjects();
    this.getRisksConfig(this.vehicleObject);
  }
}
