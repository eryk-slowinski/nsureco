import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { Policy } from 'src/app/models/policy';
import { PolicyLine } from 'src/app/models/policyLine';
import { Vehicle } from 'src/app/models/vehicle';
import { InsuredObject } from 'src/app/models/insuredObject';
import { DatePipe } from '@angular/common';
import { PolicyService } from 'src/app/services/policy.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.css'],
})
export class CreatePolicyComponent implements OnInit {
  transaction: Transaction;
  policy: Policy;
  policyLine: PolicyLine;
  vehicle: Vehicle;
  insuredObject: InsuredObject;
  datepipe: DatePipe = new DatePipe('en-US');

  constructor(
    private policyService: PolicyService,
    private customerService: CustomerService
  ) {}

  customerSelected: Object = new Object();

  selectedVehicleType: string;

  selectedBrand: string;
  brands: string[];

  chooseVehicleType(vehicleType: string) {
    this.vehicle.vehicleType = vehicleType;
    this.policyService
      .getVehicles(this.vehicle)
      .subscribe((data) => (this.brands = data));
  }

  selectedModel: string;
  models: string[];

  chooseVehicleBrand(vehicleBrand: string) {
    this.vehicle.brand = vehicleBrand;
    this.policyService
      .getVehicles(this.vehicle)
      .subscribe((data) => (this.models = data));
  }

  selectedGeneration: string;
  generations: string[];

  chooseVehicleModel(vehicleModel: string) {
    this.vehicle.vehicleModel = vehicleModel;
    this.policyService
      .getVehicles(this.vehicle)
      .subscribe((data) => (this.generations = data));
  }

  selectedEngineType: string;
  engineTypes: string[];

  chooseGeneration(generation: string) {
    this.vehicle.generation = generation;
    this.policyService
      .getVehicles(this.vehicle)
      .subscribe((data) => (this.engineTypes = data));
  }

  selectedEngine: string;
  engines: string[];

  chooseEngineType(engineType: string) {
    this.vehicle.engineType = engineType;
    this.policyService
      .getVehicles(this.vehicle)
      .subscribe((data) => (this.engines = data));
  }

  async createPolicy() {
    //creating transaction object, passing it to DB and then getting it back with ID generated in DB
    let currentTime = new Date();
    let currentDate = this.datepipe.transform(
      currentTime,
      'yyyy-MM-dd HH:mm:ss'
    );
    this.transaction.transactionType = 'create';
    this.transaction.modifiedBy = 'Slowik';
    this.transaction.timestamp = currentDate;
    await this.policyService.createTransaction(this.transaction).then();
    this.transaction = await this.policyService
      .getTransaction(this.transaction)
      .then();
    //setting policy object fields
    this.policy.transactionId = this.transaction['transactionId'];
    this.policy.endDate = this.policy.startDate;
    this.policy.altNo = this.policy.productType + this.policy.ownerId;
    //posting policy and getting its ID
    await this.policyService.createPolicy(this.policy).then();
    this.policy = await this.policyService.getPolicy(this.policy).then();
    //setting policy line fields and posting it
    this.policyLine.transactionId = this.transaction['transactionId'];
    this.policyLine.policyId = this.policy['policyId'];
    await this.policyService.createPolicyLine(this.policyLine).then();
  }

  async getVehicle() {
    // this.vehicle.vehicleType = this.vehicleChoosen;
    console.log(this.vehicle);

    // this.vehicles = await this.policyService.getVehicles(this.vehicle);
    console.log(this.brands);
    this.vehicle.brand = this.brands[0];

    // this.vehicles = await this.policyService.getVehicles(this.vehicle);

    console.log(this.brands);
  }

  ngOnInit() {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
  }
}
