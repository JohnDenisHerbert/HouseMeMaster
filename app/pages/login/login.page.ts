import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  private loginForm: FormGroup;
  private hasError: boolean;
  private emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email
  ]);
  private passwordValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public auth: AuthService) {
    this.loginForm = formBuilder.group({
      email: ['', this.emailValidator],
      password: ['', this.passwordValidator]
    });
  }




  private login(): void {
    // Login using Email and Password.
    if (!this.loginForm.valid) {
      // let allErrors = '';
      this.hasError = true;
      // if (!this.loginForm.controls.email.valid || this.loginForm.controls.email.hasError('required')) {
      //   allErrors += '\u2022' + this.translate.get('auth.form.error.email') + '<br/>';
      // }
      // if (!this.loginForm.controls.password.valid || this.loginForm.controls.password.hasError('required')) {
      //   allErrors += '\u2022' + this.translate.get('auth.form.error.password') + '<br/>';
      // }
      // this.toast.show(allErrors);
    } else {
     
      this.auth.loginWithEmail(this.loginForm.value['email'], this.loginForm.value['password']).then(res => {
      
        this.router.navigateByUrl('/');
        
      }).catch(err => {
      
      });
    }
  }

}