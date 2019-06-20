import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-offer-image-slider',
    templateUrl: './offer-image-slider.component.html',
    styleUrls: ['./offer-image-slider.component.scss']
})
export class OfferImageSliderComponent implements OnInit {

    @Input() imgList: String[];

    noImageUrl = '../assets/helpImage/no-image.png';

    constructor() {
    }

    ngOnInit() {
    }

}
