import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {OfferAddEditPage} from './offer-add-edit.page';
import {CoreModule} from '../../../modules/core/core.module';
import {CityFilterPipe, OfferFilterModalPage} from '../offer-filter-modal/offer-filter-modal.page';
import {OfferCityModalPage} from '../offer-city-modal/offer-city-modal.page';

const routes: Routes = [
    {
        path: '',
        component: OfferAddEditPage
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
    declarations: [OfferAddEditPage, OfferCityModalPage
       ],
    entryComponents: [
        OfferCityModalPage
    ]
})
export class OfferAddEditPageModule {
}
