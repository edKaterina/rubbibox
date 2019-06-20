import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-offer-list-item',
    templateUrl: './offer-list-item.component.html',
    styleUrls: ['./offer-list-item.component.scss']
})
export class OfferListItemComponent implements OnInit {

    noImageUrl = '../assets/helpImage/no-image.png';
    noPriceText = 'Цена не указана';

    @Input() offerItem;

    constructor() {
    }

    ngOnInit() {
    }

}
