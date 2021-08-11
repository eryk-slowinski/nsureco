import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
  }

  userCredentials: Object = new Object();
  userName: string = '';
  userPassword: string = '';
  userObj: Object = new Object();
  loggedUser: string = ' ';

  async logIn() {
    this.userCredentials = this.userService.getUserData(this.userName, this.userPassword);
    this.userObj = await this.userService.postUser().then();
    this.loggedUser = this.userService.verifyUser(this.userObj);
  }


  ngOnInit(): void {

  }
}