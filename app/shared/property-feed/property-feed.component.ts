import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';

import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';


@Component({
  selector: 'app-property-feed',
  templateUrl: './property-feed.component.html',
  styleUrls: ['./property-feed.component.scss']
})
export class PropertyFeedComponent implements OnInit {

  Propertys;
  filtered;
  user;
  Property;
  Property$;
  Location;
  heartType: string = "heart-empty"
  PropertyRef: AngularFirestoreDocument
  propertyID;
  sub;
  effect: string ;
  postID: string

	

  constructor(
    private route: ActivatedRoute, 
    public afs: AngularFirestore,
    public db: DbService,
    public modal: ModalController,
    public auth: AuthService
  ) {}

   ngOnInit() {

    this.Propertys = this.auth.user$.pipe(
      switchMap(user =>
        this.db.collection$('Propertys', ref =>
          {
            return ref
              .where('City', '==', user.City)                      
          
          }
      )
      ),
      shareReplay(1)
    );
}


 
	ngOnDestroy() {
		this.sub.unsubscribe()
	}
  async toggleHeart(Property){
    if(this.heartType == 'heart-empty') {
      const uid = await this.auth.uid();
      this.PropertyRef = this.afs.doc(`Propertys/${Property.id}`)
      this.PropertyRef.update({
        "hearts": firestore.FieldValue.arrayUnion(uid)
   })


  } else {
    const uid = await this.auth.uid();
    this.PropertyRef = this.afs.doc(`Propertys/${Property.id}`)
    this.PropertyRef.update({
      "hearts": firestore.FieldValue.arrayRemove(uid)
    })
  }
  } 
}
1