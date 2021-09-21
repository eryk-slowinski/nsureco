import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  urlName: string = 'http://localhost:8082/customerSearchByName';
  urlId: string = 'http://localhost:8082/customerSearchByID';
  urlPesel: string = 'http://localhost:8082/customerSearchByPesel';
  urlAddCustomer: string = 'http://localhost:8082/addCustomer';
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
}
