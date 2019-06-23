import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OfferService} from '../../../services/offer/offer.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-offer-filter-modal',
    templateUrl: './offer-filter-modal.page.html',
    styleUrls: ['./offer-filter-modal.page.scss'],
})
export class OfferFilterModalPage implements OnInit {

    categoryList;

    @Input() current;

    constructor(
        private modalController: ModalController,
        private offerService: OfferService
    ) {
    }

    ngOnInit() {


        this.offerService.getCategoryList()
            .pipe(
                map(category => category.map(cat => ({name: cat, toggle: true}))),
                map(options => {
                        if (!this.current || !this.current.length) {
                            return options;
                        }

                        return options.map(
                            option => {
                                return this.current.find(curOption => curOption.name === option.name) || option;
                            }
                        );

                    }
                )
            )
            .subscribe((category) => {
                this.categoryList = category;
            });

    }

    onClickClose() {
        this.modalController.dismiss({
            'result': this.categoryList
        });
    }

}
