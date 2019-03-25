import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PeopleListPage } from './people-list.page';
import { CoreModule } from './../../modules/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: PeopleListPage
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
  declarations: [PeopleListPage]
})
export class PeopleListPageModule {}
