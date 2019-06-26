import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CategoryFilterPipe, DateCreateOfferPipe, OfferListPage} from './offer-list.page';
import {OfferListItemComponent} from './components/offer-list-item/offer-list-item.component';
import {OfferFilterModalPage} from '../offer-filter-modal/offer-filter-modal.page';
import {CoreModule} from "../../../modules/core/core.module";

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
        CoreModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OfferListPage,
        OfferFilterModalPage,
        OfferListItemComponent,
        CategoryFilterPipe,
        DateCreateOfferPipe,
    ],

    entryComponents: [
        OfferFilterModalPage
    ]
})
export class OfferListPageModule {
}
