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
    path: 'peopleedit',
    loadChildren: '../../Tab_People/people-edit/people-edit.module#PeopleEditPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'subscription',
    loadChildren: '../../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'chat/:id',
    loadChildren: '../../OtherPages/chat/chat.module#ChatPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'notifications',
    loadChildren: '../../Tab_Setting/notifications/notifications.module#NotificationsPageModule',
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
  {
    path: 'balance',
    loadChildren: '../../Tab_Setting/balance/balance.module#BalancePageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'subscription',
    loadChildren: '../../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'chat/:id',
    loadChildren: '../../OtherPages/chat/chat.module#ChatPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  }


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProfileModule { }
