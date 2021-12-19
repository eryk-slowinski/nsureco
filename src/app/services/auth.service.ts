import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
//models
import { LogInData } from 'src/app/models/logInData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  urlStatus: string = environment.userService + 'serviceStatus';
  url: string = environment.userService + `verify`;
  isAuthenticated = false;
  userNotExist: string = 'NOT_EXIST';
  loggedUser = new Subject<string>();

  async postUser(logInData: FormGroup): Promise<Object> {
    return await this.http
      .post<any>(this.url, logInData)
      .toPromise()
      .catch((error) => {
        console.log(`error status : ${error.status} ${error.statusText}`);
      });
  }

  verifyUser(logInData: LogInData) {
    if (logInData['name'] === this.userNotExist) {
      this.isAuthenticated = false;
      return '';
    } else {
      this.isAuthenticated = true;
      this.router.navigate(['home']);
      this.loggedUser.next(logInData['name']);
      return logInData['name'];
    }
  }

  userLogIn(): Observable<string> {
    return this.loggedUser.asObservable();
  }

  async checkStatus(): Promise<String> {
    return await this.http.get(this.urlStatus, {responseType: 'text'}).toPromise();
  }
}
