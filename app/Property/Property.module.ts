import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PropertyPage } from './Property.page';
import { PropertyFormComponent } from './Property-form/Property-form.component';
import { PropertyDetailComponent } from './Property-detail/Property-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyPage
  },
  {
    path: ':id',
    component: PropertyDetailComponent
  }
];

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [PropertyPage, PropertyFormComponent, PropertyDetailComponent],
  entryComponents: [PropertyFormComponent]
})
export class PropertyPageModule {}
