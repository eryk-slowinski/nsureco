import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuredObject } from '../models/insuredObject';
import { PolicyLine } from '../models/policyLine';
import { Transaction } from '../models/transaction';
import { Vehicle } from '../models/vehicle';
import { Policy } from '../models/policy';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  createTransactionUrl: string = environment.policyService+'createtransaction';
  createPolicyUrl: string = environment.policyService+'createpolicy';
  createPolicyLineUrl: string = environment.policyService+'createpolicyline';
  createInsuredObjectUrl: string = environment.policyService+'createinsuredobject';
  getTransactionUrl: string = environment.policyService+'gettransactionid';
  getPolicyUrl: string = environment.policyService+'getpolicy';
  getPolicyLineUrl: string = environment.policyService+'getpolicyline';
  getVehiclesUrl: string = environment.policyService+'getvehicles';

  constructor(private http: HttpClient) {}

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

  getVehicles(vehicles: Object): Observable<string[]> {
    return this.http.post<string[]>(this.getVehiclesUrl, vehicles);
  }

  async createInsuredObject(insuredObj: Object): Promise<InsuredObject> {
    return await this.http
      .post<InsuredObject>(this.createInsuredObjectUrl, insuredObj)
      .toPromise();
  }
}
