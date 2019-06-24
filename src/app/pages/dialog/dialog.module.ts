import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

   // {path: '', redirectTo: 'dialog'},


    {path: '', loadChildren: '../../OtherPages/dialogs/dialogs.module#DialogsPageModule'},

    {path: 'dialog/:id', loadChildren: '../../OtherPages/chat/chat.module#ChatPageModule'},



];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class DialogModule {
}
