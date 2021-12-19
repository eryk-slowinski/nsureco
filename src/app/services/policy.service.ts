import { VehicleTypesConfig } from './../models/vehicleTypesConfig';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
import { BehaviorSubject } from 'rxjs';

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
  policySelected: BehaviorSubject<Object> = new BehaviorSubject<any>(Object);

  constructor(private http: HttpClient) { }

  async getProducts(): Promise<ProductsConfig[]> {
    return await this.http
      .get<ProductsConfig[]>(this.getProductsUrl)
      .toPromise();
  }

  async getPolicyLines(product: string): Promise<PolicyLinesConfig[]> {
    return await this.http
      .post<PolicyLinesConfig[]>(this.getPolicyLinesUrl, { productId: product })
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

  async getPolicy(policy: Policy): Promise<Policy> {
    return await this.http.post<Policy>(this.getPolicyUrl, policy).toPromise();
  }

  async searchPolicy(policy: Policy): Promise<Policy[]> {
    return await this.http.post<Policy[]>(this.searchPolicyUrl, policy).toPromise();
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
}
