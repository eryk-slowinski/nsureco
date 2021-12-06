import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//models
import { InsuredObject } from '../models/insuredObject';
import { PolicyLine } from '../models/policyLine';
import { Transaction } from '../models/transaction';
import { Vehicle } from '../models/vehicle';
import { Policy } from '../models/policy';
import { ObjectsConfig } from '../models/objectsConfig';
import { ObjectRisksConfig } from './../models/objectRisksConfig';
import { ObjectRisks } from './../models/objectRisks';
import { PolicyLinesConfig } from './../models/policyLinesConfig';
import { ProductsConfig } from './../models/productsConfig';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  createTransactionUrl: string = 'http://localhost:8083/createtransaction';
  createPolicyUrl: string = 'http://localhost:8083/createpolicy';
  createPolicyLineUrl: string = 'http://localhost:8083/createpolicyline';
  createInsuredObjectUrl: string = 'http://localhost:8083/insertinsuredobject';
  getTransactionUrl: string = 'http://localhost:8083/gettransactionid';
  getPolicyUrl: string = 'http://localhost:8083/getpolicy';
  getPolicyLineUrl: string = 'http://localhost:8083/getpolicyline';
  getVehiclesUrl: string = 'http://localhost:8083/getvehicles';
  getProductsUrl: string = 'http://localhost:8083/getproducts';
  getPolicyLinesUrl: string = 'http://localhost:8083/getpolicylinetypes';
  getObjectsUrl: string = 'http://localhost:8083/getobjecttypes';
  createRisksUrl: string = 'http://localhost:8083/createrisks';
  getObjectRisksConfigUrl: string = 'http://localhost:8083/getrisksconfig';
  calculationUrl: string = 'http://localhost:8083/calculations';
  updateRiskUrl: string = 'http://localhost:8083/updaterisk';
  getRisksUrl: string = 'http://localhost:8083/getrisks';

  constructor(private http: HttpClient) {}

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

  async changeCoverage(risk: ObjectRisks): Promise<ObjectRisks> {
    return await this.http
      .post<ObjectRisks>(this.updateRiskUrl, risk)
      .toPromise();
  }

  async calculation(policyLine: PolicyLine) {
    await this.http.post(this.calculationUrl, policyLine).toPromise();
  }
}
