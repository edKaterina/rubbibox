import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../../interfaces/model/offer';
import {OfferService} from '../../../services/offer/offer.service';

@Component({
    selector: 'app-offer-detail',
    templateUrl: './offer-detail.page.html',
    styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {

    id: string;
    detailInfo: Offer;


    constructor(
        private activateRoute: ActivatedRoute,
        private offerService: OfferService
    ) {
    }

    ngOnInit() {

        this.id = this.activateRoute.snapshot.params['id'];

        this.offerService.getById(this.id).subscribe(data => {
            this.detailInfo = data;
            console.log(this.detailInfo)
        });
    }

}
