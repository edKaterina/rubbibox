import {Component, Input, OnInit} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';

@Component({
    selector: 'app-offer-list-item',
    templateUrl: './offer-list-item.component.html',
    styleUrls: ['./offer-list-item.component.scss']
})
export class OfferListItemComponent implements OnInit {

    noImageUrl = IMAGE_SETTINGS.NO_IMAGE;
    noPriceText = 'noPrice';

    @Input() offerItem;

    constructor() {
    }

    ngOnInit() {
    }

}
