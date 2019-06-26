import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsListPage } from './settings-list.page';
import {CoreModule} from "../../../../modules/core/core.module";

const routes: Routes = [
  {
    path: '',
    component: SettingsListPage
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
  declarations: [SettingsListPage]
})
export class SettingsListPageModule {}
