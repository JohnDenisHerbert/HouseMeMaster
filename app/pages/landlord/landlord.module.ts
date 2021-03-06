import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LandlordPage } from './landlord.page';

const routes: Routes = [
  {
    path: '',
    component: LandlordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandlordPage]
})
export class LandlordPageModule {}
