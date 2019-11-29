import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import {SmsAuthComponent} from '../components/sms/sms.component';
import {CoreModule} from '../../../modules/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
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
  declarations: [LoginPage, SmsAuthComponent]
})
export class LoginPageModule {}
