import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

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
    City:'',
    RoomType:'',
    Price:'',



   
    ...this.user
  };

  this.ProfileForm = this.fb.group({
    City: [
      data.City,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]
    ],
    RoomType: [
      data.RoomType,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]
    ],
    Price: [
      data.Price,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
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
  this.router.navigateByUrl('/');
}
}
