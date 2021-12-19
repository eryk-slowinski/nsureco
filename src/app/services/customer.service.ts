import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  urlStatus: string = environment.customerService + 'serviceStatus';
  urlName: string = environment.customerService + 'customerSearchByName';
  urlId: string = environment.customerService + 'customerSearchByID';
  urlPesel: string = environment.customerService + 'customerSearchByPesel';
  urlAddCustomer: string = environment.customerService + 'addCustomer';
  customerSelected: BehaviorSubject<Object> = new BehaviorSubject<any>(Object); //variable declared to handle customer selected between independent components

  setUrl(searchForm: FormGroup): string {
    if (searchForm.value.searchBy == 'name') {
      return this.urlName;
    } else if (searchForm.value.searchBy == 'pesel') {
      return this.urlPesel;
    } else {
      return this.urlId;
    }
  }

  async searchCustomer(searchForm: FormGroup): Promise<any> {
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

  async checkStatus(): Promise<String> {
    return await this.http.get(this.urlStatus, {responseType: 'text'}).toPromise();
  }
}
