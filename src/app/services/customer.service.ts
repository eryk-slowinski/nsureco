import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/models/customer';

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

  async searchCustomer(customer: Customer): Promise<Customer[]> {
    return await this.http.post<Customer[]>(this.searchCustomersUrl, customer).toPromise();
  }

  async createCustomer(customer: Customer) {
    return await this.http
      .post<any>(this.createCustomerUrl, customer, { observe: 'response' })
      .toPromise();
  }

  async modifyCustomer(customer: Customer) {
    return await this.http.post<Customer>(this.modifyCustomerUrl, customer).toPromise();
  }

  async deleteCustomer(customer: Customer) {
    return await this.http.post<Customer>(this.deleteCustomerUrl, customer).toPromise();
  }

  async checkStatus(): Promise<String> {
    return await this.http.get(this.statusUrl, { responseType: 'text' }).toPromise();
  }
}
