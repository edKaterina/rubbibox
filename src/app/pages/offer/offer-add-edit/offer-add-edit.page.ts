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
import {CitiesService} from '../../../services/cities.service';




@Component({
    selector: 'app-offer-add-edit',
    templateUrl: './offer-add-edit.page.html',
    styleUrls: ['./offer-add-edit.page.scss'],
})
export class OfferAddEditPage implements OnInit {

    categoryList$: any;
    photo = [];
    cityList;
    city = {city: '', region: ''};

    constructor(
        private router: Router,
        private offerService: OfferService,
        private cityService: CitiesService,
        private authService: AuthService,
        private tabs: SystemPage,
        private modalController: ModalController
    ) {
        this.tabs.enable = false;
        this.cityService.getAllCities()
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
                city: this.city,
                arImg: this.photo,
                dateCreate: (new Date()).toISOString(),
                owner: uid
            }
        };

        this.offerService.add(offer);

        this.photo = [];
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
                'city': this.city
            }
        });

        await modal.present();

        const {data} = await modal.onDidDismiss();

        if(data.region != '' && data.city != ''){
            return data;
        }else{
            this.city = {city: '', region: ''}
        }
    }
}
