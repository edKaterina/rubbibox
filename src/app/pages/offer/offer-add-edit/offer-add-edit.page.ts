import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OfferService} from '../../../services/offer/offer.service';
import {AuthService} from '../../../services/auth.service';
import {SystemPage} from '../../../system/system.page';
import {NgForm} from '@angular/forms';
import {Offer} from '../../../interfaces/model/offer';
import {map} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {OfferCityModalPage} from '../offer-city-modal/offer-city-modal.page';

@Component({
    selector: 'app-offer-add-edit',
    templateUrl: './offer-add-edit.page.html',
    styleUrls: ['./offer-add-edit.page.scss'],
})
export class OfferAddEditPage implements OnInit {

    categoryList$: any;
    photo = [];
    cityList;
city;
    constructor(
        private router: Router,
        private offerService: OfferService,
        private authService: AuthService,
        private tabs: SystemPage,
        private modalController: ModalController
    ) {
        this.tabs.enable = false;
        this.offerService.getCityList()
            .pipe(
                map(cities => cities.map(city => {
                        return city.data.name;
                    }),
                )
            )
            .subscribe((city) => {
                this.cityList = city;
            });

    }

    ngOnInit() {
        this.categoryList$ = this.offerService.getCategoryList();

    }

    onSubmit(form: NgForm) {

        const uid = this.authService.getLogin();

        const offer: Offer = {
            data: {
                ...form.value,
                arImg: this.photo,
                dateCreate: (new Date()).toISOString(),
                owner: uid
            }
        };

        this.offerService.add(offer);

        form.reset();

        this.router.navigate(['/system/offers']);
    }

    choiseCity(form) {
        this.presentModal().then(data => {
            this.city = data;
        });
    }

    async presentModal() {

        const modal = await this.modalController.create({
            component: OfferCityModalPage,
            componentProps: {
                'current': this.cityList
            }
        });

        await modal.present();

        const {data} = await modal.onDidDismiss();

        return data;
    }
}
