import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { InsuredObject } from 'src/app/models/insuredObject';
import { ObjectRisk } from 'src/app/models/objectRisk';
import { ObjectRiskConfig } from 'src/app/models/objectRiskConfig';
import { ObjectTypeConfig } from 'src/app/models/objectTypeConfig';
import { Policy } from 'src/app/models/policy';
import { PolicyLine } from 'src/app/models/policyLine';
import { PolicyLineTypeConfig } from 'src/app/models/policyLineTypeConfig';
import { ProductConfig } from 'src/app/models/productConfig';
import { Transaction } from 'src/app/models/transaction';
import { Vehicle } from 'src/app/models/vehicle';
import { Vehicles } from 'src/app/models/vehicles';
import { VehicleTypeConfig } from 'src/app/models/vehicleTypeConfig';
import { CustomerService } from 'src/app/services/customer.service';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html'
})
export abstract class PolicyComponent {

  constructor(
    public policyService: PolicyService,
    public customerService: CustomerService,
  ) { }

  userName: string = 'Slowik'; // this is hardcoded name of user so in testing you dont have to log in, in production version it will be username of whoever is logged in
  transaction: Transaction = new Transaction();
  policyLine: PolicyLine = new PolicyLine();
  vehicle: Vehicle = new Vehicle();
  policy: Policy = new Policy();
  driverObject: InsuredObject = new InsuredObject();
  vehicleObject: InsuredObject = new InsuredObject();
  risk: ObjectRisk = new ObjectRisk();
  risks: ObjectRisk[] = [];
  products: ProductConfig[];
  policyLines: PolicyLineTypeConfig[];
  objects: ObjectTypeConfig[];
  objectRisksConfig: ObjectRiskConfig[];
  vehicles: Vehicles = new Vehicles();
  productConfig: ProductConfig = new ProductConfig();
  vehicleTypeObject: VehicleTypeConfig = new VehicleTypeConfig();
  vehicleTypeConfig: VehicleTypeConfig[];
  policyLineTypeConfig: PolicyLineTypeConfig = new PolicyLineTypeConfig();
  datepipe: DatePipe = new DatePipe('en-US');
  statuses: string[] = ['quotation', 'policy'];
  vehicleId: number;
  totalPremium: number = 0;
  displayStyle: string = 'none'


  async chooseProduct() {
    this.productConfig.endDate = this.policy.endDate;
    this.productConfig.startDate = this.policy.startDate;
    await this.policyService
      .getProducts(this.productConfig)
      .then((data) => (this.products = data));
  }

  async choosePolicyLine() {
    this.policyLineTypeConfig.version = this.products[0].version;
    this.policyLineTypeConfig.productId = this.policy.productType;
    await this.policyService
      .getPolicyLines(this.policyLineTypeConfig)
      .then((data) => (this.policyLines = data));
  }

  async getRequiredObjects(policyLine: string) {
    await this.policyService
      .getObjects(policyLine)
      .then((data) => (this.objects = data));
  }

  async createTransaction(transactionType: string) {
    let currentTime = new Date();
    let currentDate = this.datepipe.transform(
      currentTime,
      'yyyy-MM-dd HH:mm:ss'
    );
    this.transaction.transactionType = transactionType;
    this.transaction.modifiedBy = this.userName;
    this.transaction.timestamp = currentDate;
    await this.policyService.createTransaction(this.transaction).then();
    this.transaction = await this.policyService
      .getTransaction(this.transaction)
      .then();
  }

  async getVehicleTypes(vehicleTypeConfig: VehicleTypeConfig) {
    vehicleTypeConfig.policyLineType = this.policyLine.policyLineType;
    vehicleTypeConfig.version = this.policy.version;
    await this.policyService
      .getVehicleTypes(vehicleTypeConfig)
      .then((data) => (this.vehicleTypeConfig = data));
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
      if (this.vehicles['vehicleId']) {
        this.vehicleId = this.vehicles['vehicleId'][0];
      }
    })
  }

  async getRisksConfig(object: InsuredObject) {
    await this.policyService
      .getObjectRisksConfig(object)
      .then((data) => (this.objectRisksConfig = data));
    this.objectRisksConfig.sort((a, b) =>
      a.riskId.localeCompare(b.riskId)
    );
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

  async calculation(policy: Policy, vehicle: InsuredObject) {

    let totalPremium = 0;
    this.risks.forEach((risk) => {
      risk.premium = null;
      risk.premiumForPeriod = null;
    })
    await this.policyService.calculation(policy);
    await this.reloadCoverages(vehicle);
    this.risks.forEach((risk) => {
      if (risk.premium != NaN)
        totalPremium += risk.premium;
    })
    this.totalPremium = totalPremium;
  }

  async openPopup() {
    await this.calculation(this.policy, this.vehicleObject)
    this.displayStyle = "block";
  }
  async completePolicy() {
    await this.updatePolicy();
    this.displayStyle = "none";
  }
  async closePopup() {
    this.displayStyle = "none";
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
