import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserProfilePage } from './user-profile.page';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserOffersComponent } from './components/user-offers/user-offers.component';
import {CoreModule} from "../../../modules/core/core.module";

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
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
  declarations: [UserProfilePage, UserInfoComponent, UserOffersComponent]
})
export class ProfilePageModule {}
