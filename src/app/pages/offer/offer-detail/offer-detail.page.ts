import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../../interfaces/model/offer';
import { OfferService } from '../../../services/offer/offer.service';
import { FavoriteService } from '../../../services/user/favorite.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../../interfaces/model/user';
import { AuthService } from '../../../services/auth.service';
import { NavController, PopoverController, AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user/user.service';
import { IMAGE_SETTINGS } from '../../../config/no-image.settings';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { LINK_SETTINGS } from 'src/app/config/deep-link.setting';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ClaimModalComponent } from './components/claim-modal/claim-modal.component';

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
    link;
    constructor(
        private activateRoute: ActivatedRoute,
        private offerService: OfferService,
        private favoriteService: FavoriteService,
        private authService: AuthService,
        private navController: NavController,
        private userService: UserService,
        private popoverController: PopoverController,
        private alertController: ModalController,
        private socialSharing: SocialSharing
    ) {
    }

    ngOnInit() {

        this.id = this.activateRoute.snapshot.params['id'];
        this.authService.authWait().then((login) => {
            this.favor = this.favoriteService.isFavor('adds', this.id).pipe(map(res => {
                return { res };
            }));

        });
        this.detailInfo = this.offerService.getById(this.id).pipe(tap((item) => {
            this.userData = this.userService.getById(item.data.owner);
            this.link = ` Объявление: ${item.data.name + ' ' + LINK_SETTINGS.HOST + '/offer/' + item.id}`;
        }));
    }

    back() {
        this.navController.back();
    }

    share(offer?) {
        this.socialSharing.share(this.link);
    }
    async presentModalClaim() {

        const modal = await this.alertController.create({
            component: ClaimModalComponent,
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        if (data.claim) {
            this.offerService.sendClaim(data.claim, this.id);
        }
    }
    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverMenuComponent,
            event: ev,
            translucent: true,
            componentProps: { link: this.link }
        });
        await popover.present();
        const { data } = await popover.onDidDismiss();
        if (data.claim) {
            this.presentModalClaim();
        }
    }

    toggleFavorite(favor) {
        this.favoriteService.setFavor('adds', this.id, !favor);
    }
}
