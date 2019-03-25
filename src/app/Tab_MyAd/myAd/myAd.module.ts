import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyAdPage } from './myAd.page';
import { CoreModule } from './../../modules/core/core.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CoreModule,
    RouterModule.forChild([{ path: '', component: MyAdPage }])
  ],
  declarations: [MyAdPage]
})
export class MyAdPageModule {}
