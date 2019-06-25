import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['/auth']);
const routes: Routes = [

  // {path: '', redirectTo: 'offers'},

  {
    path: '',
    loadChildren: '../../pages/profile/user-profile/user-profile.module#ProfilePageModule'
  },
  {
    path: 'user-edit',
    loadChildren: '../../pages/profile/user-edit/user-edit.module#UserEditPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'agreement',
    loadChildren: '../../Tab_Setting/agreement/agreement.module#AgreementPageModule'
  },
  {
    path: 'about',
    loadChildren: '../../Tab_Setting/about/about.module#AboutPageModule'
  },


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProfileModule { }
