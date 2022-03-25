import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
//models
import { InsuredObject } from 'src/app/models/insuredObject';
import { PolicyLine } from 'src/app/models/policyLine';
import { Transaction } from 'src/app/models/transaction';
import { Vehicle } from 'src/app/models/vehicle';
import { Policy } from 'src/app/models/policy';
import { ProductConfig } from '../models/productConfig';
import { PolicyLineTypeConfig } from '../models/policyLineTypeConfig';
import { ObjectTypeConfig } from '../models/objectTypeConfig';
import { ObjectRiskConfig } from '../models/objectRiskConfig';
import { ObjectRisk } from '../models/objectRisk';
import { VehicleTypeConfig } from '../models/vehicleTypeConfig';
import { ObjectFlexfieldConfig } from '../models/objectFlexfieldConfig';
import { PremiumCalcConfigHeader } from '../models/premiumCalcConfigHeader';
import { PremiumCalcConfigValue } from '../models/premiumCalcConfigValue';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  urlStatus: string = environment.policyService + 'serviceStatus';
  createTransactionUrl: string =
    environment.policyService + 'createtransaction';
  createPolicyUrl: string = environment.policyService + 'createpolicy';
  createPolicyLineUrl: string = environment.policyService + 'createpolicyline';
  createInsuredObjectUrl: string =
    environment.policyService + 'insertinsuredobject';
  getTransactionUrl: string = environment.policyService + 'gettransactionid';
  getPolicyUrl: string = environment.policyService + 'getpolicy';
  getPolicyLineUrl: string = environment.policyService + 'getpolicyline';
  getVehiclesUrl: string = environment.policyService + 'getvehicles';
  getProductsUrl: string = environment.policyService + 'getproducts';
  getPolicyLinesUrl: string = environment.policyService + 'getpolicylinetypes';
  getObjectsUrl: string = environment.policyService + 'getobjecttypes';
  createRisksUrl: string = environment.policyService + 'createrisks';
  getObjectRisksConfigUrl: string =
    environment.policyService + 'getrisksconfig';
  calculationUrl: string = environment.policyService + 'calculations';
  updateRiskUrl: string = environment.policyService + 'updaterisk';
  getRisksUrl: string = environment.policyService + 'getrisks';
  getVehicleTypesUrl: string = environment.policyService + 'getvehicletypes';
  searchPolicyUrl: string = environment.policyService + 'searchpolicy';
  searchPolicyLineUrl: string = environment.policyService + 'searchpolicyline';
  updatePolicyUrl: string = environment.policyService + 'updatepolicy';
  updatePolicyLineUrl: string = environment.policyService + 'updatepolicyline';
  updateInsuredVehicleUrl: string =
    environment.policyService + 'updateinsuredvehicle';
  searchInsuredObjectUrl: string =
    environment.policyService + 'searchinsuredobject';
  searchVehicleUrl: string = environment.policyService + 'getvehicle';
  allVehiclesUrl: string = environment.policyService + 'allvehicles';
  mergeVehicleUrl: string = environment.policyService + 'mergevehicle';
  allObjectFlexfieldsUrl: string =
    environment.policyService + 'allobjectflexfields';
  mergeObjectFlexfieldUrl: string =
    environment.policyService + 'mergeobjectflexfield';
  allObjectRiskConfigUrl: string =
    environment.policyService + 'allobjectriskconfig';
  mergeObjectRiskConfigUrl: string =
    environment.policyService + 'mergeobjectriskconfig';
  mergeProductConfigUrl: string =
    environment.policyService + 'mergeproductConfig';
  getAllPolicyLineTypesUrl: string =
    environment.policyService + 'allpolicylinetypesconfig';
  mergePolicyLineTypeConfigUrl: string =
    environment.policyService + 'mergepolicylinetypeconfig';
  getAllPremiumHeadersUrl: string =
    environment.policyService + 'allpremiumheadersconfig';

  getAllProductConfigUrl: string =
    environment.policyService + 'allproductconfig';

  mergePremiumHeadersUrl: string =
    environment.policyService + 'mergepremiumheadersconfig';
  getAllPremiumValuesUrl: string =
    environment.policyService + 'allpremiumvaluesconfig';
  mergePremiumValuesUrl: string =
    environment.policyService + 'mergepremiumvaluesconfig';
  policySelected: BehaviorSubject<Object> = new BehaviorSubject<any>(Object);
  constructor(private http: HttpClient) { }

  async getProductConfig(): Promise<ProductConfig[]> {
    return await this.http
      .get<ProductConfig[]>(this.getAllProductConfigUrl)
      .toPromise();
  }

  async getProducts(productConfig: ProductConfig): Promise<ProductConfig[]> {
    return await this.http
      .post<ProductConfig[]>(this.getProductsUrl, productConfig)
      .toPromise();
  }

  async getPolicyLines(policyLineConfig: PolicyLineTypeConfig): Promise<PolicyLineTypeConfig[]> {
    return await this.http
      .post<PolicyLineTypeConfig[]>(this.getPolicyLinesUrl, policyLineConfig)
      .toPromise();
  }

  async getObjects(policyLine: string): Promise<ObjectTypeConfig[]> {
    return await this.http
      .post<ObjectTypeConfig[]>(this.getObjectsUrl, {
        policyLineId: policyLine,
      })
      .toPromise();
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return await this.http
      .post<Transaction>(this.createTransactionUrl, transaction)
      .toPromise();
  }

  async getTransaction(transaction: Transaction): Promise<Transaction> {
    return await this.http
      .post<Transaction>(this.getTransactionUrl, transaction)
      .toPromise();
  }

  async createPolicy(policy: Policy): Promise<Policy> {
    return await this.http
      .post<Policy>(this.createPolicyUrl, policy)
      .toPromise();
  }

  async getPolicy(policy: Object): Promise<Object> {
    return await this.http.post<Object>(this.getPolicyUrl, policy).toPromise();
  }

  async searchPolicy(policy: Policy): Promise<Policy[]> {
    return await this.http
      .post<Policy[]>(this.searchPolicyUrl, policy)
      .toPromise();
  }

  async updatePolicy(policy: Policy): Promise<Policy> {
    return await this.http
      .post<Policy>(this.updatePolicyUrl, policy)
      .toPromise();
  }

  async createPolicyLine(policyLine: Object): Promise<PolicyLine> {
    return await this.http
      .post<PolicyLine>(this.createPolicyLineUrl, policyLine)
      .toPromise();
  }

  async getPolicyLine(policyLine: Object): Promise<PolicyLine> {
    return await this.http
      .post<PolicyLine>(this.getPolicyLineUrl, policyLine)
      .toPromise();
  }

  async searchPolicyLine(policyLine: PolicyLine): Promise<PolicyLine> {
    return await this.http
      .post<PolicyLine>(this.searchPolicyLineUrl, policyLine)
      .toPromise();
  }

  async updatePolicyLine(policyLine: PolicyLine): Promise<PolicyLine> {
    return await this.http
      .post<PolicyLine>(this.updatePolicyLineUrl, policyLine)
      .toPromise();
  }

  async getObjectRisksConfig(
    insuredObject: InsuredObject
  ): Promise<ObjectRiskConfig[]> {
    return await this.http
      .post<ObjectRiskConfig[]>(this.getObjectRisksConfigUrl, insuredObject)
      .toPromise();
  }

  async getVehicles(vehicles: Object): Promise<Vehicle[]> {
    return await this.http
      .post<Vehicle[]>(this.getVehiclesUrl, vehicles)
      .toPromise();
  }

  async createInsuredObject(insuredObj: Object): Promise<InsuredObject> {
    return await this.http
      .post<InsuredObject>(this.createInsuredObjectUrl, insuredObj)
      .toPromise();
  }

  async getInsuredObject(insuredObj: Object): Promise<InsuredObject> {
    return await this.http
      .post<InsuredObject>(this.createInsuredObjectUrl, insuredObj)
      .toPromise();
  }

  async searchInsuredObject(insuredObj: Object): Promise<InsuredObject> {
    return await this.http
      .post<InsuredObject>(this.searchInsuredObjectUrl, insuredObj)
      .toPromise();
  }

  async updateInsuredObject(insuredObj: Object): Promise<InsuredObject> {
    return await this.http
      .post<InsuredObject>(this.updateInsuredVehicleUrl, insuredObj)
      .toPromise();
  }

  async searchVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return await this.http
      .post<Vehicle>(this.searchVehicleUrl, vehicle)
      .toPromise();
  }

  async createRisks(risks: ObjectRisk): Promise<ObjectRisk> {
    return await this.http
      .post<ObjectRisk>(this.createRisksUrl, risks)
      .toPromise();
  }

  async getRisks(object: InsuredObject): Promise<ObjectRisk[]> {
    return await this.http
      .post<ObjectRisk[]>(this.getRisksUrl, object)
      .toPromise();
  }

  async getVehicleTypes(
    object: VehicleTypeConfig
  ): Promise<VehicleTypeConfig[]> {
    return await this.http
      .post<VehicleTypeConfig[]>(this.getVehicleTypesUrl, object)
      .toPromise();
  }

  async changeCoverage(risk: ObjectRisk): Promise<ObjectRisk> {
    return await this.http
      .post<ObjectRisk>(this.updateRiskUrl, risk)
      .toPromise();
  }

  async calculation(policy: Policy) {
    await this.http.post(this.calculationUrl, policy).toPromise();
  }

  async checkStatus(): Promise<String> {
    return await this.http
      .get(this.urlStatus, { responseType: 'text' })
      .toPromise();
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.http.get<Vehicle[]>(this.allVehiclesUrl).toPromise();
  }

  async mergeVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return await this.http
      .post<Vehicle>(this.mergeVehicleUrl, vehicle)
      .toPromise();
  }

  async getAllObjectFlexfields(): Promise<ObjectFlexfieldConfig[]> {
    return await this.http
      .get<ObjectFlexfieldConfig[]>(this.allObjectFlexfieldsUrl)
      .toPromise();
  }

  async mergeObjectFlexfield(
    flexfield: ObjectFlexfieldConfig
  ): Promise<ObjectFlexfieldConfig> {
    return await this.http
      .post<ObjectFlexfieldConfig>(this.mergeObjectFlexfieldUrl, flexfield)
      .toPromise();
  }

  async getAllObjectRiskConfig(): Promise<ObjectRiskConfig[]> {
    return await this.http
      .get<ObjectRiskConfig[]>(this.allObjectRiskConfigUrl)
      .toPromise();
  }

  async mergeObjectRiskConfig(
    risk: ObjectRiskConfig
  ): Promise<ObjectRiskConfig> {
    return await this.http
      .post<ObjectRiskConfig>(this.mergeObjectRiskConfigUrl, risk)
      .toPromise();
  }

  async mergeProductConfig(product: ProductConfig): Promise<ProductConfig> {
    return await this.http
      .post<ProductConfig>(this.mergeProductConfigUrl, product)
      .toPromise();
  }

  async getAllPolicyLines(): Promise<PolicyLineTypeConfig[]> {
    return await this.http
      .get<PolicyLineTypeConfig[]>(this.getAllPolicyLineTypesUrl)
      .toPromise();
  }

  async mergePolicyLineTypeConfig(
    policyLineType: PolicyLineTypeConfig
  ): Promise<PolicyLineTypeConfig> {
    return await this.http
      .post<PolicyLineTypeConfig>(
        this.mergePolicyLineTypeConfigUrl,
        policyLineType
      )
      .toPromise();
  }

  async getAllPremiumCalcHeaders(): Promise<PremiumCalcConfigHeader[]> {
    return await this.http
      .get<PremiumCalcConfigHeader[]>(this.getAllPremiumHeadersUrl)
      .toPromise();
  }

  async mergePremiumCalcHeadersConfig(
    premiumCalcHeaders: PremiumCalcConfigHeader
  ): Promise<PremiumCalcConfigHeader> {
    return await this.http
      .post<PremiumCalcConfigHeader>(
        this.mergePremiumHeadersUrl,
        premiumCalcHeaders
      )
      .toPromise();
  }

  async getAllPremiumCalcValues(): Promise<PremiumCalcConfigValue[]> {
    return await this.http
      .get<PremiumCalcConfigValue[]>(this.getAllPremiumValuesUrl)
      .toPromise();
  }

  async mergePremiumCalcValuesConfig(
    premiumCalcValues: PremiumCalcConfigValue
  ): Promise<PremiumCalcConfigValue> {
    return await this.http
      .post<PremiumCalcConfigValue>(
        this.mergePremiumValuesUrl,
        premiumCalcValues
      )
      .toPromise();
  }
}
