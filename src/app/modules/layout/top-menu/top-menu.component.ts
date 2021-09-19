import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements OnInit {
  loggedUser: string = '';

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.isAuthenticated = false;
    this.loggedUser = '';
  }

  ngOnInit(): void {
    this.authService.userLogIn().subscribe((data) => {
      this.loggedUser = data;
    });
  }
}

