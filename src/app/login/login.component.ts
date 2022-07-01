import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginResponse, UserService } from '../user.service';

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
          this.successfulLogin(res);
        } else if(res?.error) {
          this.errorMessage = res?.error;
        }
      });
    }

  }

  successfulLogin(res: LoginResponse) {
    const user = {
      firstname: res.user?.firstname,
      lastname: res.user?.lastname
    };

    sessionStorage.setItem('accessToken', res.accessToken || '');
    sessionStorage.setItem('user', JSON.stringify(user));
    this.location.back();
  }

}
