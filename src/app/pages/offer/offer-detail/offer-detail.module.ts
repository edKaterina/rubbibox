import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfferDetailPage } from './offer-detail.page';
import { OfferImageSliderComponent } from './components/offer-image-slider/offer-image-slider.component';
import { OfferDetailUserInfoComponent } from './components/offer-detail-user-info/offer-detail-user-info.component';
import {CoreModule} from '../../../modules/core/core.module';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { ClaimModalComponent } from './components/claim-modal/claim-modal.component';

const routes: Routes = [
  {
    path: '',
    component: OfferDetailPage
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
  declarations: [OfferDetailPage, OfferImageSliderComponent, OfferDetailUserInfoComponent, PopoverMenuComponent, ClaimModalComponent],
  entryComponents: [PopoverMenuComponent, ClaimModalComponent]
})
export class OfferDetailPageModule {}
