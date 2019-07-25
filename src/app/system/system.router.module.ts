import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemPage} from './system.page';
import {AuthGuard} from '../services/auth.guard';


const routes: Routes = [
    {
        path: '', component: SystemPage,
        children: [
            {
                path: '',
                redirectTo: 'offers'
            },
            {
                path: 'offers',
                loadChildren: '../pages/offer/offer.module#OfferModule'
            },
            {
                path: 'dialogs',
                loadChildren: '../pages/messenger/messenger.module#MessengerModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                loadChildren: '../pages/profile/profile.module#ProfileModule',
                canActivate: [AuthGuard]
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
