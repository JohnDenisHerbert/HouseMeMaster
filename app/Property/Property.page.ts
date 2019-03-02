import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';

import { ModalController } from '@ionic/angular';
import { PropertyFormComponent } from './Property-form/Property-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-Property',
  templateUrl: './Property.page.html',
  styleUrls: ['./Property.page.scss']
})
export class PropertyPage implements OnInit {
  Propertys;
  filtered;

  filter = new BehaviorSubject(null);

  constructor(
    public db: DbService,
    public modal: ModalController,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.Propertys = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('Propertys', ref =>
          ref
            .where('uid', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .limit(25)
        )
      ),
      shareReplay(1)
    );

    this.filtered = this.filter.pipe(
      switchMap(status => {
        return this.Propertys.pipe(
          map(arr =>
            (arr as any[]).filter(
              obj => (status ? obj.status === status : true)
            )
          )
        );
      })
    );
  }

  deleteProperty(Property) {
    this.db.delete(`Propertys/${Property.id}`);
  }

  toggleStatus(Property) {
    const status = Property.status === 'complete' ? 'Available' : 'Unavailable';
    this.db.updateAt(`Propertys/${Property.id}`, { status });
  }

  updateFilter(val) {
    this.filter.next(val);
  }

  async presentPropertyForm(Property?: any) {
    const modal = await this.modal.create({
      component: PropertyFormComponent,
      componentProps: { Property }
    });
    return await modal.present();
  }

  trackById(idx, Property) {
    return Property.id;
  }
}
