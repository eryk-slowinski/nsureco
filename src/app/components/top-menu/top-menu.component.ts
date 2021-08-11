import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  loggedUser: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.userLogIn().subscribe(data => {
      this.loggedUser = data;
    });

  }
}

