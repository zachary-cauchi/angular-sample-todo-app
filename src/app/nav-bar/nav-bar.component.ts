import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  firstname = '';
  
  constructor(
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  isLoggedIn() {
    if (!sessionStorage.getItem('user')) {
      return false;
    }
    
    const user = JSON.parse(sessionStorage.getItem('user') || '{}') as Partial<User>;
    
    if (user?.firstname && sessionStorage.getItem('accessToken')) {
      this.firstname = user.firstname;

      return true;
    } else {
      return false
    }
  }

  logout() {
    sessionStorage.clear();
    this.location.go(this.location.path());
  }

}
