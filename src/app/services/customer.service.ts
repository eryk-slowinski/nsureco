import { Subject } from 'rxjs';
import { Customer } from './../models/customer';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private selectedCustomer: Subject<any> = new Subject<any>();
  urlName: string = 'http://localhost:8082/customerSearchByName';
  urlId: string = 'http://localhost:8082/customerSearchByID';
  urlPesel: string = 'http://localhost:8082/customerSearchByPesel';
  urlAddCustomer: string = 'http://localhost:8082/addCustomer';

  setUrl(searchForm: FormGroup): string {
    switch (searchForm.value.searchBy) {
      case 'name': {
        return this.urlName;
      }
      case 'pesel': {
        return this.urlPesel;
      }
      default: {
        return this.urlId;
      }
    }
  }

  async searchCustomer(searchForm: FormGroup): Promise<Customer> {
    let url = this.setUrl(searchForm);
    let searchJson = {
      [searchForm.value.searchBy]: searchForm.value.searchValue,
    };
    return await this.http.post<any>(url, searchJson).toPromise();
  }

  async addCustomer(createCustomerForm: FormGroup) {
    return await this.http
      .post<any>(this.urlAddCustomer, createCustomerForm.value)
      .toPromise();
  }

  public selectCustomer(customer: Object) {
    this.selectedCustomer.next(customer);
  }

  public getSelectedCustomer() {
    return this.selectedCustomer.asObservable();
  }
}
