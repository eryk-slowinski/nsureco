import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  logInData = null;
  loggedUser: string = ' ';


  async onSubmit() {
    this.logInData = await this.authService.postUser(this.logInForm.value);
    this.loggedUser = this.authService.verifyUser(this.logInData);
  }

  logInForm = new FormGroup({
    userName: new FormControl(null, Validators.required),
    userPassword: new FormControl(null, Validators.required)
  });

  get userName() {
    return this.logInForm.get('userName');
  }

  get userPassword() {
    return this.logInForm.get('userPassword');
  }

  ngOnInit(): void {}
}
