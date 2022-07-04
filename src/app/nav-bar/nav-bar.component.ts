import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  firstname = '';
  
  constructor(
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  isLoggedIn() {
    if (!sessionStorage.getItem('user')) {
      return false;
    }
    
    const user = JSON.parse(sessionStorage.getItem('user') || '{}') as Partial<User>;
    
    if (user?.firstname && this.userService.getAccessToken()) {
      this.firstname = user.firstname;

      return true;
    } else {
      return false
    }
  }

  logout() {
    this.userService.clearUserCredentials();
    this.location.go(this.location.path());
  }

}
