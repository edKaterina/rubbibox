import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-offer-city-modal',
    templateUrl: './offer-city-modal.page.html',
    styleUrls: ['./offer-city-modal.page.scss'],
})
export class OfferCityModalPage implements OnInit {

    @Input() current;

    constructor(
        private modalController: ModalController,
    ) {

    }

    ngOnInit() {
    }

    closeModal(result) {
        this.modalController.dismiss(
            result,
        );

    }
}
