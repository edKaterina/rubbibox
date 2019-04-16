import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'peopledetail/:id',
    children:
      [
        {
          path: '',
          loadChildren: './Tab_People/people-detail/people-detail.module#PeopleDetailPageModule'
        }
      ]
  },
  {
    path: 'chat/:id',
    children:
      [
        {
          path: '',
          loadChildren: './OtherPages/chat/chat.module#ChatPageModule'
        }
      ]
  },
  {
    path: 'detail/:id',
    children:
      [
        {
          path: '',
          loadChildren: './OtherPages/detail/detail.module#DetailPageModule'
        }
      ]
  },
  { path: 'auth', loadChildren: './Tab_Setting/auth/auth.module#AuthPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
