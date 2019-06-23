import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-offer-filter-modal',
    templateUrl: './offer-filter-modal.page.html',
    styleUrls: ['./offer-filter-modal.page.scss'],
})
export class OfferFilterModalPage implements OnInit {

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    onClickClose() {
        this.modalController.dismiss();
    }

}
