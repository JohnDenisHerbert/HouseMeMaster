import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

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
