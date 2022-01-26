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
import { Vehicles } from './../../../models/vehicles';
import { PolicyLineTypesComponent } from '../../core/configs/policy-config/policy-line-types/policy-line-types.component';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.css'],
})
export class CreatePolicyComponent implements OnInit {
  userName: string = 'Slowik'; // this is hardcoded name of user so in testing you dont have to log in, in production version it will be username of whoever is logged in
  transaction: Transaction = new Transaction();
  policy: Policy = new Policy();
  startDate: Date;
  endDate: Date = new Date();
  productType: string;
  policyLine: PolicyLine = new PolicyLine();
  vehicle: Vehicle = new Vehicle();
  driverObject: InsuredObject = new InsuredObject();
  vehicleObject: InsuredObject = new InsuredObject();
  risk: ObjectRisks = new ObjectRisks();
  datepipe: DatePipe = new DatePipe('en-US');
  risks: ObjectRisks[] = [];
  products: ProductsConfig[];
  policyLines: PolicyLinesConfig[];
  objects: ObjectsConfig[];
  objectRisksConfig: ObjectRisksConfig[];
  customerSelected: Object = new Object();
  vehicles: Vehicles = new Vehicles();
  vehicleTypesObject: VehicleTypesConfig = new VehicleTypesConfig();
  vehicleTypesConfig: VehicleTypesConfig[];
  driverCreated: boolean = false;
  vehicleCreated: boolean = false;
  totalPremium: number = 0;
  vehicleId: number;
  statuses: String[] = ["quotation", "policy"]
  status: String;
  productsConfig: ProductsConfig = new ProductsConfig();

  constructor(
    public policyService: PolicyService,
    public customerService: CustomerService
  ) { }

  async chooseProduct() {
    await this.policyService
      .getProducts(this.productsConfig)
      .then((data) => (this.products = data));
    this.productType = this.products[0].productId;
    console.log(this.products);
  }

  policyLineConfig: PolicyLinesConfig = new PolicyLinesConfig();
  async choosePolicyLine(product: string) {
    console.log(product);
    this.policyLineConfig.productId = product;
    this.policyLineConfig.version = this.products[0].version;

    console.log('im before 0');

    await this.policyService
      .getPolicyLines(this.policyLineConfig)
      .then((data) => (this.policyLines = data));
    console.log('im after');

    console.log(this.policyLines);

  }

  async getRequiredObjects(policyLine: string) {
    await this.policyService
      .getObjects(policyLine)
      .then((data) => (this.objects = data));
  }

  async getVehicleTypes(object: VehicleTypesConfig) {
    object.policyLineType = this.policyLine.policyLineType;
    object.version = this.products[0].version;
    await this.policyService
      .getVehicleTypes(object)
      .then((data) => (this.vehicleTypesConfig = data));
  }

  async chooseVeh(vehicleProperties: string) {
    switch (vehicleProperties) {
      case 'brand': {
        this.vehicle.brand = null;
        this.vehicle.vehicleModel = null;
        this.vehicle.generation = null;
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'vehicleModel': {
        this.vehicle.vehicleModel = null;
        this.vehicle.generation = null;
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'generation': {
        this.vehicle.generation = null;
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'engineType': {
        this.vehicle.engineType = null;
        this.vehicle.engine = null;
        break;
      }
      case 'engine': {
        this.vehicle.engine = null;
        break;
      }
    }

    await this.policyService.getVehicles(this.vehicle).then((data) => {
      this.vehicles[vehicleProperties] = data;
      if (this.vehicles.vehicleId) {
        this.vehicleId = this.vehicles.vehicleId[0];
      }
    })
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
    this.policyLine.transactionId = this.transaction.transactionId;
    this.policyLine.policyId = this.policy.policyId;
    this.policyLine.version = this.policy.version;
    await this.policyService.createPolicyLine(this.policyLine).then();
    this.policyLine = await this.policyService
      .getPolicyLine(this.policyLine)
      .then();
  }

  setEndDate(productsConfig: ProductsConfig) {
    var result = new Date(productsConfig.startDate);
    result.setFullYear(result.getFullYear() + 1);
    result.setDate(result.getDate() - 1);
    this.endDate = result;
    this.policy.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
  }

  async createPolicy() {
    await this.createTransaction();
    // this.policy.startDate = this.productsConfig.startDate;

    this.policy.startDate = this.datepipe.transform(this.productsConfig.startDate, 'yyyy-MM-dd');
    this.policy.transactionId = this.transaction.transactionId;
    this.policy.ownerId = this.customerSelected['customerId'];
    this.policy.type = 'Vehicle insurance';
    this.policy.status = 'quotation';
    this.policy.altNo = this.policy.productType + this.policy.ownerId;
    this.policy.version = '1.0';
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
    this.vehicleObject.policyLineId = this.policyLine.policyLineId;
    this.vehicleObject.transactionId = this.transaction.transactionId;
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
    this.driverObject.policyLineId = this.policyLine.policyLineId;
    this.driverObject.transactionId = this.transaction.transactionId;
    this.driverObject.type = 'DRI';
    this.driverObject.version = this.policyLine.version;
    this.driverObject.n01 = this.customerSelected['customerId'];
    this.driverObject = await this.policyService.createInsuredObject(this.driverObject).then();
  }

  async getRisksConfig(object: InsuredObject) {
    await this.policyService
      .getObjectRisksConfig(object)
      .then((data) => (this.objectRisksConfig = data));
    this.objectRisksConfig.sort((a, b) =>
      a.riskId.localeCompare(b.riskId)
    );
  }

  async createRisks(object: InsuredObject) {
    await this.getRisksConfig(object);
    this.objectRisksConfig.forEach(async (element) => {
      this.risk.riskId = element.riskId;
      this.risk.objectId = object.objectId;
      this.risk.isSelected = 'false';
      await this.policyService.createRisks(this.risk).then();
    });
    await this.delay(300);
  }

  async updatePolicy() {
    await this.policyService.updatePolicy(this.policy).then();
  }

  async updatePolicyLine() {
    await this.policyService.updatePolicyLine(this.policyLine);
  }

  async updateInsuredVehicle() {
    this.vehicleObject.n01 = this.vehicleId;
    await this.policyService.updateInsuredObject(this.vehicleObject).then();
  }

  async updateInsuredDriver() {
    await this.policyService.updateInsuredObject(this.driverObject).then();
  }

  async reloadCoverages(object: InsuredObject) {
    this.risks = await this.policyService.getRisks(object);
    this.risks.sort((a, b) => a.riskId.localeCompare(b.riskId));
  }

  async calculation(policyLine: PolicyLine, vehicle: InsuredObject) {
    console.log(policyLine);
    console.log(vehicle);


    let totalPremium = 0;
    this.risks.forEach((risk) => {
      risk.premium = null;
      risk.premiumForPeriod = null;
    })
    await this.policyService.calculation(policyLine);
    await this.reloadCoverages(vehicle);
    this.risks.forEach((risk) => {
      if (risk.premium != NaN)
        totalPremium += risk.premium;
    })
    this.totalPremium = totalPremium;
  }

  async toggleCoverage(riskId: string) {
    this.risks.forEach((riskFromList) => {
      if (riskFromList.riskId == riskId) {
        this.risk = riskFromList;
      }
    });
    this.risk.isSelected == 'false'
      ? (this.risk.isSelected = 'true')
      : (this.risk.isSelected = 'false');
    await this.policyService.changeCoverage(this.risk).then();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit() {
    this.customerService.customerSelected.subscribe((customer) => {
      this.customerSelected = customer;
    });
    this.customerService.customerSelected.next(this.customerSelected);
  }


  displayStyle = "none";

  async openPopup() {
    await this.calculation(this.policyLine, this.vehicleObject)
    this.displayStyle = "block";
  }
  async completePolicy() {
    await this.updatePolicy();
    this.displayStyle = "none";
  }
  async closePopup() {
    this.displayStyle = "none";
  }
}
