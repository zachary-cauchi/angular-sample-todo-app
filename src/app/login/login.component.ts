import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    emailField: ['', Validators.compose([Validators.required, Validators.email])],
    passwordField: ['', Validators.required]
  }, { updateOn: 'submit' })

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {

  }

  tryLogin(): void {
    if (this.loginForm.status === 'VALID') {
      const loginValue = this.loginForm.value;

      this.userService.loginUser(loginValue.emailField || '', loginValue.passwordField || '').subscribe(res => {
        if (res?.accessToken && res?.user) {
          this.errorMessage = '';
          this.location.back();
        } else if(res?.error) {
          this.errorMessage = res?.error;
        }
      });
    }

  }

}
