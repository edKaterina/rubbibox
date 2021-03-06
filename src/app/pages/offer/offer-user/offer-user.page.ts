import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {Observable} from 'rxjs';
import {User} from '../../../interfaces/model/user';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {IMAGE_SETTINGS} from '../../../config/no-image.settings';
import {OfferService} from '../../../services/offer/offer.service';
import {Offer} from '../../../interfaces/model/offer';
import {FavoriteService} from '../../../services/user/favorite.service';
import {formatValidator} from '@angular-devkit/schematics/src/formats/format-validator';
import {AuthService} from '../../../services/auth.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LINK_SETTINGS } from 'src/app/config/deep-link.setting';
import {CoreService} from '../../../services/core.service';

@Component({
    selector: 'app-offer-user',
    templateUrl: './offer-user.page.html',
    styleUrls: ['./offer-user.page.scss'],
})
export class OfferUserPage implements OnInit {
    offerList$: Observable<Offer[]>;

    userId;
    user: Observable<User>;
    favor;
    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;
    noImageUrl = IMAGE_SETTINGS.NO_IMAGE;

    constructor(
        private activeRout: ActivatedRoute,
        private userService: UserService,
        private offerService: OfferService,
        private favoriteService: FavoriteService,
        private authService: AuthService,
        private socialSharing: SocialSharing,
        public coreService: CoreService
    ) {
    }
    share(user) {
        this.socialSharing.share(`${ LINK_SETTINGS.HOST + '/' + (user.data.login ? user.data.login : user.id)}`);
    }
    ngOnInit() {
        this.userId = this.activeRout.snapshot.params.id;
        this.authService.authWait().then((login) => {

            this.favor = this.favoriteService.isFavor('users', this.userId).pipe(map(res => {
                return {res};
            }));
        });
this.user = this.userService.getById(this.userId).pipe(
                map((item: User) => {
                        return item;
                    }
                ));
        this.offerList$ = this.offerService.getListByUser(this.userId);


    }

    toggleFavorite(favor) {
        this.favoriteService.setFavor('users', this.userId, !favor);
    }


    doRefresh(event) {
        this.offerList$ = this.offerService.getListByUser(this.userId);
        event.target.complete();
    }
}
