import {Component, Input, OnInit} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../settings/no-image.settings';

@Component({
    selector: 'app-offer-detail-user-info',
    templateUrl: './offer-detail-user-info.component.html',
    styleUrls: ['./offer-detail-user-info.component.scss']
})
export class OfferDetailUserInfoComponent implements OnInit {

    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;

    userData = {
        profileUrl: '',
        name: 'Иванов Иван Иванович'
    };

    @Input() UserID;

    constructor() {
    }

    ngOnInit() {
    }

}
