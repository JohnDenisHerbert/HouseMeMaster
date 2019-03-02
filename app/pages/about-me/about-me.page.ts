import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.page.html',
  styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage implements OnInit {

  constructor(
    private router: Router,
    private db: DbService,
    private auth: AuthService,
    public modal: ModalController,
    private fb: FormBuilder // private params: NavParams
  ) { }

  ProfileForm: FormGroup;

  user;

  ngOnInit() {
    const data = {
    Age: '',
    Occupation: '',
    Gender: '',
    AboutMe: '',
   
    ...this.user
  };

  this.ProfileForm = this.fb.group({
    AboutMe: [
      data.AboutMe,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250)
      ]
    ],
    Occupation: [
      data.Occupation,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ]
    ],
    Age: [
      data.Age,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3)
      ]
    ],
    Gender: [
      data.Gender,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]
    ]
  });
}

async UpdateUser() {
  const uid = await this.auth.uid();
  const id = this.user ? this.user.uid : '';
    const data = {
      uid,
    createdAt: Date.now(),
    ...this.user,
    ...this.ProfileForm.value
  };

  this.db.updateAt(`users/${uid}`, data);
  this.router.navigateByUrl('/Preferences');
}
}
