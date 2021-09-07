import { NgForm, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LogInData } from './../models/logInData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  url: string = `http://localhost:8082/verify`;
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
}
