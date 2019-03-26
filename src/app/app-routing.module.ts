import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'detail/:id', loadChildren: './OtherPages/detail/detail.module#DetailPageModule'},
  { path: 'peopledetail/:id', loadChildren: './Tab_People/people-detail/people-detail.module#PeopleDetailPageModule'},
  { path: 'chat/:id', loadChildren: './OtherPages/chat/chat.module#ChatPageModule'},
  { path: 'notifications', loadChildren: './Tab_Setting/notifications/notifications.module#NotificationsPageModule'},
  { path: 'agreement', loadChildren: './Tab_Setting/agreement/agreement.module#AgreementPageModule' },
  { path: 'about', loadChildren: './Tab_Setting/about/about.module#AboutPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
