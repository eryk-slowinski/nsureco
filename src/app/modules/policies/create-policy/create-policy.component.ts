import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PolicyService } from 'src/app/services/policy.service';
import { CustomerService } from 'src/app/services/customer.service';
//models
import { Transaction } from 'src/app/models/transaction';
import { ObjectsConfig } from 'src/app/models/objectsConfig';
import { PolicyLinesConfig } from 'src/app/models/policyLinesConfig';
import { ProductsConfig } from 'src/app/models/productsConfig';
import { Policy } from 'src/app/models/policy';
import { PolicyLine } from 'src/app/models/policyLine';
import { Vehicle } from 'src/app/models/vehicle';
import { InsuredObject } from 'src/app/models/insuredObject';
import { ObjectRisksConfig } from 'src/app/models/objectRisksConfig';
import { ObjectRisks } from 'src/app/models/objectRisks';
import { VehicleTypesConfig } from 'src/app/models/vehicleTypesConfig';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.css'],
})
export class CreatePolicyComponent implements OnInit {
  userName: string = 'Slowik'; // this is hardcoded name of user so in testing you dont have to log in, in production version it will be username of whoever is logged in
  transaction: Transaction = new Transaction();
  policy: Policy = new Policy();
  policyLine: PolicyLine = new PolicyLine();
  vehicle: Vehicle = new Vehicle();
  driverObject: InsuredObject = new InsuredObject();
  vehicleObject: InsuredObject = new InsuredObject();
  risk: ObjectRisks = new ObjectRisks();
  datepipe: DatePipe = new DatePipe('en-US');
  risks: ObjectRisks[];
  products: ProductsConfig[];
  policyLines: PolicyLinesConfig[];
  objects: ObjectsConfig[];
  objectRisksConfig: ObjectRisksConfig[];
  customerSelected: Object = new Object();
  vehicles: Vehicle[];

  constructor(
    private policyService: PolicyService,
    private customerService: CustomerService
  ) {}

  configuration = {
    productId: null,
    policyLineId: null,
  };

  async chooseProduct() {
    await this.policyService
      .getProducts()
      .then((data) => (this.products = data));
  }

  async choosePolicyLine(product: string) {
    await this.policyService
      .getPolicyLines(product)
      .then((data) => (this.policyLines = data));
  }

  async getRequiredObjects(policyLine: string) {
    await this.policyService
      .getObjects(policyLine)
      .then((data) => (this.objects = data));
  }

  vehicleTypesObject: VehicleTypesConfig = new VehicleTypesConfig();
  vehicleTypesConfig: VehicleTypesConfig[];

  async getVehicleTypes(object: VehicleTypesConfig) {
    object.productLineType = this.configuration.policyLineId;
    await this.policyService
      .getVehicleTypes(object)
      .then((data) => (this.vehicleTypesConfig = data));
  }

  //TO BE RESOLVED IN ANOTHER TASK
  // async chooseVehicleProperty(iteration: number) {
  //   await this.policyService.getVehicles(this.vehicle).then((data) => {
  //     this.vehicles = data;
  //   });
  // }

  async chooseVehicleType() {
    await this.policyService.getVehicles(this.vehicle).then((data) => {
      this.vehicles = data;
    });
  }

  async chooseVehicleBrand() {
    await this.policyService
      .getVehicles(this.vehicle)
      .then((data) => (this.vehicles = data));
  }

  async chooseVehicleModel() {
    await this.policyService
      .getVehicles(this.vehicle)
      .then((data) => (this.vehicles = data));
  }

  async chooseGeneration() {
    await this.policyService
      .getVehicles(this.vehicle)
      .then((data) => (this.vehicles = data));
  }

  async chooseEngineType() {
    await this.policyService
      .getVehicles(this.vehicle)
      .then((data) => (this.vehicles = data));
  }

  async chooseEngine() {
    await this.policyService
      .getVehicles(this.vehicle)
      .then((data) => (this.vehicles = data));
  }

  async createTransaction() {
    let currentTime = new Date();
    let currentDate = this.datepipe.transform(
      currentTime,
      'yyyy-MM-dd HH:mm:ss'
    );
    this.transaction.transactionType = 'create';
    this.transaction.modifiedBy = this.userName;
    this.transaction.timestamp = currentDate;
    await this.policyService.createTransaction(this.transaction).then();
    this.transaction = await this.policyService
      .getTransaction(this.transaction)
      .then();
  }

  async createPolicyLine() {
    this.policyLine.transactionId = this.transaction['transactionId'];
    this.policyLine.policyId = this.policy['policyId'];
    this.policyLine.productLineType = this.configuration.policyLineId;
    this.policyLine.version = '1.0';
    await this.policyService.createPolicyLine(this.policyLine).then();
    this.policyLine = await this.policyService
      .getPolicyLine(this.policyLine)
      .then();
  }

  async createPolicy() {
    await this.createTransaction();
    this.policy.transactionId = this.transaction.transactionId;
    this.policy.ownerId = this.customerSelected[0];
    this.policy.type = 'Vehicle insurance';
    this.policy.status = 'quotation';
    this.policy.productType = this.configuration.productId;
    this.policy.altNo = this.policy.productType + this.policy.ownerId;
    this.policy.version = '1.0';
    await this.policyService.createPolicy(this.policy).then();
    this.policy = await this.policyService.getPolicy(this.policy).then();
    await this.createPolicyLine();
  }

  async createInsuredVehicle() {
    this.vehicleObject.policyLineId = this.policyLine.policyLineId;
    this.vehicleObject.transactionId = this.transaction.transactionId;
    this.vehicleObject.n01 = Number(this.vehicles[0]);
    this.vehicleObject.type = 'VEH';
    this.vehicleObject.version = this.policyLine.version;
    // this.vehicleObject.d01 = date;
    await this.policyService.createInsuredObject(this.vehicleObject).then();
    this.vehicleObject = await this.policyService
      .createInsuredObject(this.vehicleObject)
      .then();
  }

  async createInsuredDriver() {
    this.driverObject.policyLineId = this.policyLine.policyLineId;
    this.driverObject.transactionId = this.transaction.transactionId;
    this.driverObject.type = 'DRI';
    this.vehicleObject.version = this.policyLine.version;
    this.driverObject.n01 = this.customerSelected[0];
    await this.policyService.createInsuredObject(this.driverObject).then();
  }

  async getRisksConfig(object: InsuredObject) {
    await this.policyService
      .getObjectRisksConfig(object)
      .then((data) => (this.objectRisksConfig = data));
  }

  async createRisks(object: InsuredObject) {
    await this.getRisksConfig(object);
    this.objectRisksConfig.forEach((element) => {
      this.risk.riskId = element.objectRisks; // NAZWA DO ZMIANY => czarny
      this.risk.objectId = object.objectId;
      this.risk.isSelected = 'false';
      this.policyService.createRisks(this.risk).then();
    });
  }

  async getRisks(object: InsuredObject) {
    return await this.policyService.getRisks(object).then();
  }

  async changeCoverage(risk: ObjectRisks, riskId: string) {
    this.risks = await this.getRisks(this.vehicleObject);
    for (let i = 0; i < this.risks.length; i++) {
      if (this.risks[i].riskId == riskId) {
        risk.id = this.risks[i].id;
        break;
      }
    }
    risk.objectId = this.vehicleObject.objectId;
    risk.riskId = riskId;
    risk.isSelected = 'true';
    await this.policyService.changeCoverage(risk).then();
  }

  async calculation(policyLine: PolicyLine) {
    await this.policyService.calculation(policyLine);
  }

  ngOnInit() {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.chooseProduct();
  }
}
