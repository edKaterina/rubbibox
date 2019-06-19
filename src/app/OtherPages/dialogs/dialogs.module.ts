import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DialogsPage } from './dialogs.page';
import { CoreModule } from '../../modules/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: DialogsPage
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
  declarations: [DialogsPage]
})
export class DialogsPageModule {}
