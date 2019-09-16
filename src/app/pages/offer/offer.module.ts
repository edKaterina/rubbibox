import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../services/auth.guard';




const routes: Routes = [
    // Лист заявок
    {path: '', loadChildren: '../../pages/offer/offer-list/offer-list.module#OfferListPageModule'},

    // Конкретная заявка
    {path: 'offer/:id', loadChildren: '../../pages/offer/offer-detail/offer-detail.module#OfferDetailPageModule'},
// Пользователь
    {path: 'user/:id', loadChildren: '../../pages/offer/offer-user/offer-user.module#OfferUserPageModule'},

    //Добавить заявку
    {
        path: 'add',
        loadChildren: '../../pages/offer/offer-add-edit/offer-add-edit.module#OfferAddEditPageModule',
        canActivate: [AuthGuard]
    },

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
