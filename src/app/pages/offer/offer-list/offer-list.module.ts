import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {OfferListPage} from './offer-list.page';
import {OfferListItemComponent} from './components/offer-list-item/offer-list-item.component';

const routes: Routes = [
    {
        path: '',
        component: OfferListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OfferListPage,
        OfferListItemComponent
    ]
})
export class OfferListPageModule {
}
