import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [

    // Лист заявок
    {path: '', loadChildren: '../../pages/offer/offer-list/offer-list.module#OfferListPageModule'},

    // Конкретная заявка
    {path: 'offer/:id', loadChildren: '../../pages/offer/offer-detail/offer-detail.module#OfferDetailPageModule'},

    {path: 'add', loadChildren: '../../Tab_MyAd/add-form/add-form.module#AddFormPageModule'},

    // { path: 'offer-filter-modal', loadChildren: './offer-filter-modal/offer-filter-modal.module#OfferFilterModalPageModule' }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class OfferModule {
}
