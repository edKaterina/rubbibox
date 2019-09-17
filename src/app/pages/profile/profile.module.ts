import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: '../../pages/profile/user-profile/user-profile.module#ProfilePageModule'
    },
    {
        path: 'favorite',
        loadChildren: './favorite/favorite.module#FavoritePageModule'
    },
    {
        path: 'user-edit',
        loadChildren: '../../pages/profile/user-edit/user-edit.module#UserEditPageModule',
    },
    {
        path: 'offer/:id',
        loadChildren: '../../pages/offer/offer-detail/offer-detail.module#OfferDetailPageModule'
    },
    {
        path: 'settings',
        loadChildren: '../../pages/profile/settings/settings-list/settings-list.module#SettingsListPageModule'
    },
    {
        path: 'settings/agreement',
        loadChildren: '../../pages/profile/settings/agreement/agreement.module#AgreementPageModule'
    },
    {
        path: 'settings/about',
        loadChildren: '../../pages/profile/settings/about/about.module#AboutPageModule'
    },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class ProfileModule {
}
