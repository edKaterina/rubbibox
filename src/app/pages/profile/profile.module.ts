import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../services/auth.guard';



const routes: Routes = [

  // {path: '', redirectTo: 'offers'},

  {
    path: '',
    loadChildren: '../../Tab_Setting/setting/setting.module#SettingPageModule'
  },
  {
    path: 'peopleedit',
    loadChildren: '../../Tab_People/people-edit/people-edit.module#PeopleEditPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'subscription',
    loadChildren: '../../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:id',
    loadChildren: '../../OtherPages/chat/chat.module#ChatPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: '../../Tab_Setting/notifications/notifications.module#NotificationsPageModule',
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]
  },
  {
    path: 'subscription',
    loadChildren: '../../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:id',
    loadChildren: '../../OtherPages/chat/chat.module#ChatPageModule',
    canActivate: [AuthGuard]
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
