import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgreementPage } from './agreement.page';
import {CoreModule} from '../../../../modules/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: AgreementPage
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
  declarations: [AgreementPage]
})
export class AgreementPageModule {}
