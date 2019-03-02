import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.page.html',
  styleUrls: ['./landlord.page.scss'],
})
export class LandlordPage implements OnInit {

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
      isLandlord: Boolean,

    ...this.user
  };

  this.ProfileForm = this.fb.group({
    isLandlord: [
      data.isLandlord,
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

  await this.db.updateAt(`users/${uid}`, data);

  if (this.ProfileForm.value.isLandlord === "false"){
  this.router.navigateByUrl('/CreateProfile');
  }
  else if(this.ProfileForm.value.isLandlord === "true"){
    this.router.navigateByUrl('/');

  }
  
}
}
