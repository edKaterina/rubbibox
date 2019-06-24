import {Component, Input, OnInit} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';
import {User} from '../../../../../interfaces/model/user';
import {Observable} from "rxjs";
import {UserService} from "../../../../../services/user/user.service";
@Component({
    selector: 'app-offer-detail-user-info',
    inputs: ['uid'],
    templateUrl: './offer-detail-user-info.component.html',
    styleUrls: ['./offer-detail-user-info.component.scss']
})
export class OfferDetailUserInfoComponent implements OnInit {

    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;

    user: User;

    @Input() uid;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getById(this.uid).subscribe((user:User)=>{this.user = user});
    }

}
