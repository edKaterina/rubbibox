import {Component, Input, OnInit} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';
import {User} from '../../../../../interfaces/model/user';
import {UserService} from '../../../../../services/user/user.service';
import {AuthService} from '../../../../../services/auth.service';
import {FavoriteService} from '../../../../../services/user/favorite.service';

@Component({
    selector: 'app-offer-detail-user-info',
    inputs: ['uid'],
    templateUrl: './offer-detail-user-info.component.html',
    styleUrls: ['./offer-detail-user-info.component.scss']
})
export class OfferDetailUserInfoComponent implements OnInit {

    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;
    user: User;

    @Input()
    set uid(uid) {
        if (uid) {
            this.userService.getById(uid).subscribe((user: User) => {
                this.user = user;
            });
        }
    }

    constructor(
        private userService: UserService,
        public authService: AuthService
    ) {
    }

    ngOnInit() {
    }


}
