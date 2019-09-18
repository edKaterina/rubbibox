import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../../interfaces/model/offer';
import {OfferService} from '../../../services/offer/offer.service';
import {FavoriteService} from '../../../services/user/favorite.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {User} from '../../../interfaces/model/user';
import {AuthService} from '../../../services/auth.service';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import {IMAGE_SETTINGS} from '../../../config/no-image.settings';

@Component({
    selector: 'app-offer-detail',
    templateUrl: './offer-detail.page.html',
    styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {

    id: string;
    detailInfo: Observable<Offer>;
    favor: Observable<{ res: boolean }>;
    userData;
    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;

    constructor(
        private activateRoute: ActivatedRoute,
        private offerService: OfferService,
        private favoriteService: FavoriteService,
        private authService: AuthService,
        private navController: NavController,
        private userService: UserService
    ) {
    }

    ngOnInit() {

        this.id = this.activateRoute.snapshot.params['id'];
        this.authService.authWait().then((login) => {
            this.favor = this.favoriteService.isFavor('adds', this.id).pipe(map(res => {
                console.log({res});
                return {res};
            }));

        });
        this.detailInfo = this.offerService.getById(this.id).pipe(tap((item) => {
            this.userData = this.userService.getById(item.data.owner);
        }));
    }

    back() {
        this.navController.back();
    }

    toggleFavorite(favor) {
        this.favoriteService.setFavor('adds', this.id, !favor);
    }
}
