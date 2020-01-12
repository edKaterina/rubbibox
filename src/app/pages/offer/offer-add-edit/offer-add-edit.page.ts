import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OfferService} from '../../../services/offer/offer.service';
import {AuthService} from '../../../services/auth.service';
import {SystemPage} from '../../../system/system.page';
import {FormControl, NgForm} from '@angular/forms';
import {Offer} from '../../../interfaces/model/offer';
import {first, map} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {OfferCityModalPage} from '../offer-city-modal/offer-city-modal.page';
import {CitiesService} from '../../../services/cities.service';
import {BehaviorSubject} from 'rxjs';
import {CoreService} from '../../../services/core.service';


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
    offer: {
        name: '',
        description: '',
        category: {name: string, childrenCategory: string[]},
        childrenCategory: ''
    };
    id: string;
    loading: Boolean = true;

    constructor(
        private router: Router,
        private offerService: OfferService,
        private cityService: CitiesService,
        private authService: AuthService,
        private tabs: SystemPage,
        private zone: NgZone,
        private activateRoute: ActivatedRoute,
        private modalController: ModalController,
        private coreService: CoreService
    ) {
        this.id = this.activateRoute.snapshot.params['id'];
        this.tabs.enable = false;
        this.cityService.getAllCities()
            .subscribe((city) => {
                this.cityList = city;
            });

    }

    ngOnInit() {
        this.offer = {
            name: '',
            description: '',
            category: {name: '', childrenCategory: []},
            childrenCategory: ''
        };
        this.offerService.getCategoryList().subscribe((res => {
            this.categoryList$ = res;
            if (this.id > '') {
                this.offerService.getById(this.id).pipe(first()).subscribe(( res: any) => {
                    if (res) {
                        this.city = res.data.city;
                        this.photo = res.data.arImg;
                        this.offer = {
                            ...res.data,
                            category: this.categoryList$.find(item => item.name === res.data.category)
                        };

                    }
                });
            }
        }));

    }

    ClearChildren() {
        if (!this.loading) {
            this.offer.childrenCategory = '';
        }
    }

    onSubmit(form: NgForm) {

        const uid = this.authService.getLogin();

        const offer: Offer = {
            data: {
                ...form.value,
                city: this.city,
                arImg: this.photo,
                category: form.value.category.name,
                childrenCategory: this.offer.childrenCategory,
                dateCreate: (new Date()).toISOString(),
                owner: uid
            }
        };
        if (this.id) {
            this.offerService.edit({id: this.id, ...offer});
        } else {
            this.offerService.add(offer);
        }

        this.photo = [];
        form.reset();

        this.coreService.back();
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

        if (data.region !== '' && data.city !== '') {
            return data;
        } else {
            this.city = {city: '', region: ''};
        }
    }
}
