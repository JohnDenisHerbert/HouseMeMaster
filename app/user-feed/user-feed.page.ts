import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbService } from '../services/db.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.page.html',
  styleUrls: ['./user-feed.page.scss'],
})
export class UserFeedPage implements OnInit {

  renters;
  filtered;
  users: any;
  Propertys
  filter = new BehaviorSubject(null);
  
  constructor( public db: DbService,
    public modal: ModalController,
    public auth: AuthService) { }

  ngOnInit() {
    this.users = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('users', ref =>{
          return ref
            .where('isLandlord', '==', false )
        }
        )
      ),
      shareReplay(1)
    );

    
      }
}
