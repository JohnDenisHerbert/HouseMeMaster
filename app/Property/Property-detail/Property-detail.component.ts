import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DbService } from '../../services/db.service';
import { NgModule } from "@angular/core";
import {APP_BASE_HREF} from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule.forRoot([]),],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }, AngularFirestore]
})

@Component({
  selector: 'app-Property-detail',
  templateUrl: './Property-detail.component.html',
  styleUrls: ['./Property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  Property$;

  constructor(private route: ActivatedRoute, private db: DbService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Property$ = this.db.doc$(`Propertys/${id}`);
  }
}
