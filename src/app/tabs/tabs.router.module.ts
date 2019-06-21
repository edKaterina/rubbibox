import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../services/auth.guard';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,

        children: [
            {
                path: 'offers',
                children: [
                    // Лист заявок
                    {path: '', loadChildren: '../pages/offer/offer-list/offer-list.module#OfferListPageModule'},
                    // Конкретная заявка
                    {path: 'offer/:id', loadChildren: '../pages/offer/offer-detail/offer-detail.module#OfferDetailPageModule'},


                    {
                        path: 'subscription',
                        loadChildren: '../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule',
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'chat/:id',
                        loadChildren: '../OtherPages/chat/chat.module#ChatPageModule',
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'my-offers', children: [
                    // Мои заявки
                    {path: '', loadChildren: '../Tab_MyAd/myAd/myAd.module#MyAdPageModule'},
                    // Добавить заявку
                    {path: 'add-form', loadChildren: '../Tab_MyAd/add-form/add-form.module#AddFormPageModule'}

                ]
            },
            {
                path: 'dialog',
                children: [
                    {
                        path: '',
                        loadChildren: '../OtherPages/dialogs/dialogs.module#DialogsPageModule'
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
                        loadChildren: '../Tab_People/people-edit/people-edit.module#PeopleEditPageModule',
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'subscription',
                        loadChildren: '../Tab_AllAd/subscription/subscription.module#SubscriptionPageModule',
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'chat/:id',
                        loadChildren: '../OtherPages/chat/chat.module#ChatPageModule',
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'notifications',
                        loadChildren: '../Tab_Setting/notifications/notifications.module#NotificationsPageModule',
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'agreement',
                        loadChildren: '../Tab_Setting/agreement/agreement.module#AgreementPageModule'
                    },
                    {
                        path: 'about',
                        loadChildren: '../Tab_Setting/about/about.module#AboutPageModule'
                    },
                    {
                        path: 'balance',
                        loadChildren: '../Tab_Setting/balance/balance.module#BalancePageModule',
                        canActivate: [AuthGuard]
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
        redirectTo: '/tabs/offers',
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
export class TabsPageRoutingModule {
}
