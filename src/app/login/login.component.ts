import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    emailField: ['', Validators.required],
    passwordField: ['', Validators.required]
  }, { updateOn: 'submit' })

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {

  }

  tryLogin(): void {
  }

  successfulLogin() {
    this.location.back();
  }

}
