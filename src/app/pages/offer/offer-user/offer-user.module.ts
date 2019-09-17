import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfferUserPage } from './offer-user.page';
import {CoreModule} from '../../../modules/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: OfferUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OfferUserPage]
})
export class OfferUserPageModule {}
