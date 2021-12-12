import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient) {}

  urlName: string = environment.dbService + 'serviceStatus';

  async checkStatus(): Promise<String> {
    return await this.http.get(this.urlName, {responseType: 'text'}).toPromise();
  }
}
