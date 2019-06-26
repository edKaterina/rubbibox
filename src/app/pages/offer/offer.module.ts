import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    // Лист заявок
    {path: '', loadChildren: '../../pages/offer/offer-list/offer-list.module#OfferListPageModule'},

    // Конкретная заявка
    {path: 'offer/:id', loadChildren: '../../pages/offer/offer-detail/offer-detail.module#OfferDetailPageModule'},

    //Добавить заявку
    {path: 'add', loadChildren: '../../pages/offer/offer-add-edit/offer-add-edit.module#OfferAddEditPageModule'},

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
