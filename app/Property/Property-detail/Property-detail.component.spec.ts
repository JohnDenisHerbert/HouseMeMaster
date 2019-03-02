import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PropertyDetailComponent } from './Property-detail.component';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

describe('PropertyDetailComponent', () => {
  let component: PropertyDetailComponent;
  let fixture: ComponentFixture<PropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDetailComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([]),],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }, AngularFirestore]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 // it('should create', () => {
   // expect(component).toBeTruthy();
  //});
});
