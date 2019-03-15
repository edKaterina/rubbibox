import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PeopleEditPage } from './people-edit.page';
import { CoreModule } from '../../modules/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: PeopleEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CoreModule
  ],
  declarations: [PeopleEditPage]
})
export class PeopleEditPageModule {}
