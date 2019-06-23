import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemPage} from './system.page';

const routes: Routes = [


    {
        path: '', component: SystemPage,

        children: [

            {path: '/system', redirectTo: 'offers'},

            {path: 'offers', loadChildren: '../pages/offer/offer.module#OfferModule'},

            {path: 'dialogs', loadChildren: '../pages/dialog/dialog.module#DialogModule'},

            {path: 'profile', loadChildren: '../pages/profile/profile.module#ProfileModule'}

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
