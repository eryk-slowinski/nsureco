import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LogInData } from './../models/logInData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  url: string = `http://localhost:8082/verify`;
  isAuthenticated = false;
  loggedUser = new Subject<string>();

  async postUser(signInForm: NgForm): Promise<Object> {
    return await this.http
      .post<any>(this.url, signInForm)
      .toPromise();
  }

  verifyUser(logInData: LogInData) {
    if (logInData['name'] === 'NOT_EXIST') {
      this.isAuthenticated = false;
      return '';
    } else {
      this.isAuthenticated = true;
      this.router.navigate(['home'], { queryParams: { loggedin: 'true' } });
      this.loggedUser.next(logInData['name']);
      return logInData['name'];
    }
  }

  userLogIn(): Observable<string> {
    return this.loggedUser.asObservable();
  }

}
