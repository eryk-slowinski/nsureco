import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
//models
import { InsuredObject } from 'src/app/models/insuredObject';
import { PolicyLine } from 'src/app/models/policyLine';
import { Transaction } from 'src/app/models/transaction';
import { Vehicle } from 'src/app/models/vehicle';
import { Policy } from 'src/app/models/policy';
import { ObjectsConfig } from 'src/app/models/objectsConfig';
import { ObjectRisksConfig } from 'src/app/models/objectRisksConfig';
import { ObjectRisks } from 'src/app/models/objectRisks';
import { PolicyLinesConfig } from 'src/app/models/policyLinesConfig';
import { ProductsConfig } from 'src/app/models/productsConfig';
import { VehicleTypesConfig } from './../models/vehicleTypesConfig';
import { ObjectFlexfieldsConfig } from '../models/objectFlexfieldsConfig';
import { PremiumCalcConfigHeaders } from '../models/premiumCalcConfigHeaders';
import { PremiumCalcConfigValues } from '../models/premiumCalcConfigValues';


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
  updateInsuredVehicleUrl: string = environment.policyService + 'updateinsuredvehicle';
  searchInsuredObjectUrl: string = environment.policyService + 'searchinsuredobject';
  searchVehicleUrl: string = environment.policyService + 'getvehicle';
  allVehiclesUrl: string = environment.policyService + 'allvehicles';
  mergeVehicleUrl: string = environment.policyService + 'mergevehicle';
  allObjectFlexfieldsUrl: string = environment.policyService + 'allobjectflexfields';
  mergeObjectFlexfieldUrl: string = environment.policyService + 'mergeobjectflexfield';
  allObjectRiskConfigUrl: string = environment.policyService + 'allobjectriskconfig';
  mergeObjectRiskConfigUrl: string = environment.policyService + 'mergeobjectriskconfig';
  getAllProductConfigUrl: string = environment.policyService + 'allproductconfig';
  mergeProductConfigUrl: string = environment.policyService + 'mergeproductConfig';
  getAllPolicyLineTypesUrl: string = environment.policyService + 'allpolicylinetypesconfig';
  mergePolicyLineTypeConfigUrl: string = environment.policyService + 'mergepolicylinetypeconfig';
  getAllPremiumHeadersUrl: string = environment.policyService + 'allpremiumheadersconfig';
  mergePremiumHeadersUrl: string = environment.policyService + 'mergepremiumheadersconfig';
  getAllPremiumValuesUrl: string = environment.policyService + 'allpremiumvaluesconfig';
  mergePremiumValuesUrl: string = environment.policyService + 'mergepremiumvaluesconfig';
  policySelected: BehaviorSubject<Object> = new BehaviorSubject<any>(Object);

  constructor(private http: HttpClient) { }

  async getProducts(productsConfig: ProductsConfig): Promise<ProductsConfig[]> {
    console.log(productsConfig);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return await this.http
      .post<ProductsConfig[]>(this.getProductsUrl, productsConfig)
      .toPromise();
  }

  async getProductConfig(): Promise<ProductsConfig[]> {
    return await this.http
      .get<ProductsConfig[]>(this.getAllProductConfigUrl)
      .toPromise();
  }

  async getPolicyLines(policyLineConfig: PolicyLinesConfig): Promise<PolicyLinesConfig[]> {

    return await this.http
      .post<PolicyLinesConfig[]>(this.getPolicyLinesUrl, policyLineConfig)
      .toPromise();
  }

  async getObjects(policyLine: string): Promise<ObjectsConfig[]> {
    return await this.http
      .post<ObjectsConfig[]>(this.getObjectsUrl, { policyLineId: policyLine })
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
    return await this.http.post<Policy[]>(this.searchPolicyUrl, policy).toPromise();
  }

  async updatePolicy(policy: Policy): Promise<Policy> {
    return await this.http.post<Policy>(this.updatePolicyUrl, policy).toPromise();
  }

  async createPolicyLine(policyLine: PolicyLine): Promise<PolicyLine> {
    return await this.http
      .post<PolicyLine>(this.createPolicyLineUrl, policyLine)
      .toPromise();
  }

  async getPolicyLine(policyLine: PolicyLine): Promise<PolicyLine> {
    return await this.http
      .post<PolicyLine>(this.getPolicyLineUrl, policyLine)
      .toPromise();
  }

  async searchPolicyLine(policyLine: PolicyLine): Promise<PolicyLine> {
    return await this.http.post<PolicyLine>(this.searchPolicyLineUrl, policyLine).toPromise();
  }

  async updatePolicyLine(policyLine: PolicyLine): Promise<PolicyLine> {
    return await this.http.post<PolicyLine>(this.updatePolicyLineUrl, policyLine).toPromise();
  }

  async getObjectRisksConfig(
    insuredObject: InsuredObject
  ): Promise<ObjectRisksConfig[]> {
    return await this.http
      .post<ObjectRisksConfig[]>(this.getObjectRisksConfigUrl, insuredObject)
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

  async createRisks(risks: ObjectRisks): Promise<ObjectRisks> {
    return await this.http
      .post<ObjectRisks>(this.createRisksUrl, risks)
      .toPromise();
  }

  async getRisks(object: InsuredObject): Promise<ObjectRisks[]> {
    return await this.http
      .post<ObjectRisks[]>(this.getRisksUrl, object)
      .toPromise();
  }

  async getVehicleTypes(
    object: VehicleTypesConfig
  ): Promise<VehicleTypesConfig[]> {
    return await this.http
      .post<VehicleTypesConfig[]>(this.getVehicleTypesUrl, object)
      .toPromise();
  }

  async changeCoverage(risk: ObjectRisks): Promise<ObjectRisks> {
    return await this.http
      .post<ObjectRisks>(this.updateRiskUrl, risk)
      .toPromise();
  }

  async calculation(policyLine: PolicyLine) {
    await this.http.post(this.calculationUrl, policyLine).toPromise();
  }

  async checkStatus(): Promise<String> {
    return await this.http.get(this.urlStatus, { responseType: 'text' }).toPromise();
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.http.get<Vehicle[]>(this.allVehiclesUrl).toPromise();
  }

  async mergeVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return await this.http
      .post<Vehicle>(this.mergeVehicleUrl, vehicle)
      .toPromise();
  }

  async getAllObjectFlexfields(): Promise<ObjectFlexfieldsConfig[]> {
    return await this.http.get<ObjectFlexfieldsConfig[]>(this.allObjectFlexfieldsUrl).toPromise();
  }

  async mergeObjectFlexfield(flexfield: ObjectFlexfieldsConfig): Promise<ObjectFlexfieldsConfig> {
    return await this.http
      .post<ObjectFlexfieldsConfig>(this.mergeObjectFlexfieldUrl, flexfield)
      .toPromise();
  }

  async getAllObjectRiskConfig(): Promise<ObjectRisksConfig[]> {
    return await this.http.get<ObjectRisksConfig[]>(this.allObjectRiskConfigUrl).toPromise();
  }

  async mergeObjectRiskConfig(risk: ObjectRisksConfig): Promise<ObjectRisksConfig> {
    return await this.http
      .post<ObjectRisksConfig>(this.mergeObjectRiskConfigUrl, risk)
      .toPromise();
  }

  async mergeProductConfig(product: ProductsConfig): Promise<ProductsConfig> {
    return await this.http
      .post<ProductsConfig>(this.mergeProductConfigUrl, product)
      .toPromise();
  }

  async getAllPolicyLines(): Promise<PolicyLinesConfig[]> {
    return await this.http
      .get<PolicyLinesConfig[]>(this.getAllPolicyLineTypesUrl)
      .toPromise();
  }

  async mergePolicyLineTypeConfig(policyLineType: PolicyLinesConfig): Promise<PolicyLinesConfig> {
    return await this.http
      .post<PolicyLinesConfig>(this.mergePolicyLineTypeConfigUrl, policyLineType)
      .toPromise();
  }

  async getAllPremiumCalcHeaders(): Promise<PremiumCalcConfigHeaders[]> {
    return await this.http
      .get<PremiumCalcConfigHeaders[]>(this.getAllPremiumHeadersUrl)
      .toPromise();
  }

  async mergePremiumCalcHeadersConfig(premiumCalcHeaders: PremiumCalcConfigHeaders): Promise<PremiumCalcConfigHeaders> {
    return await this.http
      .post<PremiumCalcConfigHeaders>(this.mergePremiumHeadersUrl, premiumCalcHeaders)
      .toPromise();
  }

  async getAllPremiumCalcValues(): Promise<PremiumCalcConfigValues[]> {
    return await this.http
      .get<PremiumCalcConfigValues[]>(this.getAllPremiumValuesUrl)
      .toPromise();
  }

  async mergePremiumCalcValuesConfig(premiumCalcValues: PremiumCalcConfigValues): Promise<PremiumCalcConfigValues> {
    return await this.http
      .post<PremiumCalcConfigValues>(this.mergePremiumValuesUrl, premiumCalcValues)
      .toPromise();
  }

}
