import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';

import { ModalController } from '@ionic/angular';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
users;
  constructor(
    public db: DbService,
    public modal: ModalController,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  async presentProfileForm(users?: any) {
    const modal = await this.modal.create({
      component: ProfileFormComponent,
      componentProps: { users }
    });
    return await modal.present();
  }

}
