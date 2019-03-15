import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddFormPage } from './add-form.page';
import { CoreModule } from '../../modules/core/core.module';


const routes: Routes = [
  {
    path: '',
    component: AddFormPage
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
  declarations: [AddFormPage]
})
export class AddFormPageModule {}
