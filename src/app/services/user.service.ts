import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  url: string = `http://localhost:8082/verify`;
  userCredentials: Object = new Object();
  userName: string = '';
  userPassword: string = '';
  loggedUser = new Subject<string>();

  getUserData(userName: string, userPassword: string): Object {  //getting users inputs from html form
    this.userName = userName;
    this.userPassword = userPassword;
    return this.userCredentials = {
      userName: this.userName,
      userPassword: this.userPassword
    };
  }

  async postUser(): Promise<Object> {
    return await this.http.post<any>(this.url, this.userCredentials).toPromise();
  }

  verifyUser(userObj: Object) {
    if (userObj['name'] === 'NOT_EXIST') {
      return '';
    } else {
      this.router.navigate(['/'], { queryParams: { loggedin: 'true' } });
      this.loggedUser.next(userObj['name']);
      return userObj['name'];
    }
  }

  userLogIn(): Observable<string> {
    return this.loggedUser.asObservable();
  }

}
