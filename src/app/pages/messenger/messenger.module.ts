import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: '../../pages/messenger/dialogs/dialogs.module#DialogsPageModule'},
    {path: 'chat/:id', loadChildren: '../../pages/messenger/chat/chat.module#ChatPageModule'},
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class MessengerModule { }
