import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'myAd',
        children: [
          {
            path: '',
            loadChildren: '../Tab_MyAd/myAd/myAd.module#MyAdPageModule'
          },
          {
            path: 'add-form',
            loadChildren: '../Tab_MyAd/add-form/add-form.module#AddFormPageModule'
          }
        ]
      },
      {
        path: 'allAd',
        children: [
          {
            path: '',
            loadChildren: '../Tab_AllAd/allAd/allAd.module#AllAdPageModule'
          },
          {
            path: 'detail/:id',
            loadChildren: '../OtherPages/detail/detail.module#DetailPageModule'
          },
          {
            path: 'subscription',
            loadChildren: '../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule'
          },
          {
            path: 'chat/:id',
            loadChildren: '../OtherPages/chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'people',
        children: [
          {
            path: '',
            loadChildren: '../Tab_People/people-list/people-list.module#PeopleListPageModule'
          },
          {
            path: 'peopledetail/:id',
            loadChildren: '../Tab_People/people-detail/people-detail.module#PeopleDetailPageModule'
          },
          {
            path: 'peopleedit',
            loadChildren: '../Tab_People/people-edit/people-edit.module#PeopleEditPageModule'
          },
          {
            path: 'chat/:id',
            loadChildren: '../OtherPages/chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'setting',
        children: [
          {
            path: '',
            loadChildren: '../Tab_Setting/setting/setting.module#SettingPageModule'
          },
          {
            path: 'peopleedit',
            loadChildren: '../Tab_People/people-edit/people-edit.module#PeopleEditPageModule'
          },
          {
            path: 'subscription',
            loadChildren: '../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule'
          },
          {
            path: 'chat/:id',
            loadChildren: '../OtherPages/chat/chat.module#ChatPageModule'
          },
          {
            path: 'notifications',
            loadChildren: '../Tab_Setting/notifications/notifications.module#NotificationsPageModule'
          },
          {
            path: 'agreement',
            loadChildren: '../Tab_Setting/agreement/agreement.module#AgreementPageModule'
          },
          {
            path: 'about',
            loadChildren: '../Tab_Setting/about/about.module#AboutPageModule'
          }

        ]
      },
      {
        path: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/myAd',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TabsPageRoutingModule { }
