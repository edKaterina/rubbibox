import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SystemRoutingModule} from './system.router.module';

import {SystemPage} from './system.page';
import {CoreModule} from '../modules/core/core.module';

@NgModule({
    imports: [
        SystemRoutingModule,

        IonicModule,
        CommonModule,
        FormsModule,

        CoreModule
    ],
    declarations: [SystemPage]
})
export class SystemModule {
}
