import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../../interfaces/model/offer';
import {OfferService} from '../../../services/offer/offer.service';
import {FavoriteService} from '../../../services/user/favorite.service';
import {map, tap} from 'rxjs/operators';
import {User} from '../../../interfaces/model/user';
import {AuthService} from '../../../services/auth.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-offer-detail',
    templateUrl: './offer-detail.page.html',
    styleUrls: ['./offer-detail.page.scss'],
})
export class OfferDetailPage implements OnInit {

    id: string;
    detailInfo: Offer;
    favor;

    constructor(
        private activateRoute: ActivatedRoute,
        private offerService: OfferService,
        private favoriteService: FavoriteService,
        private authService: AuthService,
        private navController: NavController
    ) {
    }

    ngOnInit() {

        this.id = this.activateRoute.snapshot.params['id'];
        this.authService.authWait().then((login) => {
            this.favor = this.favoriteService.isFavor('adds', this.id).pipe(tap(item => console.log()));
        });
        this.offerService.getById(this.id).subscribe(data => {
            this.detailInfo = data;
        });
    }

    back() {
        this.navController.back();
    }

    toggleFavorite(favor) {
        this.favoriteService.setFavor('adds', this.id, !favor);
    }
}
