import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DeletedPipe, FavoritePage} from './favorite.page';
import {FavoriteOffersComponent} from './components/favorite-offers/favorite-offers.component';
import {FavoriteUsersComponent} from './components/favorite-users/favorite-users.component';
import {CoreModule} from '../../../modules/core/core.module';

const routes: Routes = [
    {
        path: '',
        component: FavoritePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CoreModule,
        RouterModule.forChild(routes)
    ],
    declarations: [FavoritePage, FavoriteOffersComponent, FavoriteUsersComponent, DeletedPipe]
})
export class FavoritePageModule {
}
