import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscriptionPage } from './subscription.page';
import { CoreModule } from './../../modules/core/core.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CoreModule,
    RouterModule.forChild([{ path: '', component: SubscriptionPage }])
  ],
  declarations: [SubscriptionPage]
})
export class SubscriptionPageModule {}
