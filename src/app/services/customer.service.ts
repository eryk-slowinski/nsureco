import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customers } from '../models/customers';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  statusUrl: string = environment.customerService + 'serviceStatus';
  searchCustomersUrl: string = environment.customerService + 'searchcustomers';
  createCustomerUrl: string = environment.customerService + 'createcustomer';
  modifyCustomerUrl: string = environment.customerService + 'modifycustomer';
  deleteCustomerUrl: string = environment.customerService + 'deletecustomer';
  customerSelected: BehaviorSubject<Object> = new BehaviorSubject<any>(Object);

  async searchCustomer(customer: Customers): Promise<Customers[]> {
    return await this.http.post<Customers[]>(this.searchCustomersUrl, customer).toPromise();
  }

  async createCustomer(customer: Customers) {
    return await this.http
      .post<any>(this.createCustomerUrl, customer)
      .toPromise();
  }

  async modifyCustomer(customer: Customers) {
    return await this.http.post<Customers>(this.modifyCustomerUrl, customer).toPromise();
  }

  async deleteCustomer(customer: Customers) {
    return await this.http.post<Customers>(this.deleteCustomerUrl, customer).toPromise();
  }

  async checkStatus(): Promise<String> {
    return await this.http.get(this.statusUrl, { responseType: 'text' }).toPromise();
  }
}
