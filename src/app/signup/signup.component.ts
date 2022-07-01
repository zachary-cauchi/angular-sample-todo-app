import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  passwordConfirmedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password1 = control.get('passwordField');
    const password2 = control.get('confirmPasswordField');

    return password1 && password2 && password1.value !== password2.value ? { passwordsMatch: false } : null;
  }

  signupForm = this.fb.group({
    emailField: ['', [Validators.required, Validators.email]],
    passwordField: ['', Validators.required],
    confirmPasswordField: ['', [Validators.required, this.passwordConfirmedValidator]],
    firstnameField: ['', [Validators.required, Validators.min(1)]],
    lastnameField: ['', [Validators.required, Validators.min(1)]]
  }, { updateOn: 'submit' });

  errorMessage = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  trySignup() {
    if (this.signupForm.status === 'VALID') {
      const newUser = {
        email: this.signupForm.get('emailField')?.value as string,
        password: this.signupForm.get('passwordField')?.value as string,
        firstname: this.signupForm.get('firstnameField')?.value as string,
        lastname: this.signupForm.get('lastnameField')?.value as string
      };
      
      this.userService.createUser(newUser).subscribe(res => {
        if (res?.accessToken && res?.user) {
          this.errorMessage = '';
          this.location.back();
        } else if(res?.error) {
          this.errorMessage = res?.error;
        }
      });
    } else {
      console.error('Errors');
      console.error(this.signupForm.errors);
      if (!this.signupForm.getError('passwordsMatch')) {
        this.errorMessage = 'Passwords do not match.';
      }
    }
  }

}
