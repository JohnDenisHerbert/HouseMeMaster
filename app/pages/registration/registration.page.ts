import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage  {

  private registerForm: FormGroup;
  private hasError: boolean = false;
  private emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email
  ]);
  private passwordValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService) {
    this.registerForm = formBuilder.group({
      email: ['', this.emailValidator],
      password: ['', this.passwordValidator],
      confirmPassword: ['', this.passwordValidator]
    });
  }

 
  private register(): void {
    // Register with Email and Password.
    if (!this.registerForm.valid || this.registerForm.value['password'] != this.registerForm.value['confirmPassword']) {
      this.hasError = true;
    } else {
     
       this.auth.registerWithEmail(this.registerForm.value['email'], this.registerForm.value['password']).then(res => 
        { res
       return this.router.navigateByUrl('/Landlord');
      }).catch(err => {
    
      });
    }
  
  }
}
