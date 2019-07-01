import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemPage} from './system.page';
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['/auth']);

const routes: Routes = [
    {
        path: '', component: SystemPage,
        children: [
            {
                path: '',
                redirectTo: 'profile'
            },
            {
                path: 'offers',
                loadChildren: '../pages/offer/offer.module#OfferModule'
            },
            {
                path: 'dialogs',
                loadChildren: '../pages/messenger/messenger.module#MessengerModule',
                ...canActivate(redirectUnauthorizedToLogin)
            },
            {
                path: 'profile',
                loadChildren: '../pages/profile/profile.module#ProfileModule',
                ...canActivate(redirectUnauthorizedToLogin)
            }
        ]
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
export class SystemRoutingModule {
}
