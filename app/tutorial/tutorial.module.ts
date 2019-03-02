import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TutorialPage } from './tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialPage
  }
];

@NgModule({

  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutorialPage]
})
export class TutorialPageModule {}
