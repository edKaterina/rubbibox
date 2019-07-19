import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OfferFilterModalPage} from '../offer-filter-modal/offer-filter-modal.page';
import {OfferService} from '../../../services/offer/offer.service';
import {Observable} from 'rxjs';
import {Offer} from '../../../interfaces/model/offer';
import {IMAGE_SETTINGS} from '../../../config/no-image.settings';
import {CitiesService} from '../../../services/cities.service';

@Pipe({
    name: 'dateCreateOffer',
})
export class DateCreateOfferPipe implements PipeTransform {
    transform(value: Array<Offer>, args?: any): any {
        if (value) {
            return value.sort(this.compare);
        }
    }

    compare(a: Offer, b: Offer) {
        if (a.data.dateCreate < b.data.dateCreate) {
            return 1;
        } else if (a.data.dateCreate > b.data.dateCreate) {
            return -1;
        }
        return 0;
    }
}

@Pipe({
    name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

    transform(value: Array<Offer>, options: Array<any>): any {

        if (!options || !options.length) {
            return value;
        }

        return value.filter((offer) => options.some(opt =>
            (opt.name === offer.data.category) && opt.toggle
        ));

    }


}

@Pipe({
    name: 'cityCatFilter'
})
export class CityCatFilterPipe implements PipeTransform {

    transform(value: Array<Offer>, options: string): any {

        if (!options || !options.length) {
            return value;
        }

        return value.filter((offer) => options === offer.data.city);

    }


}

@Component({
    selector: 'app-offer-list',
    templateUrl: './offer-list.page.html',
    styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit {

    offerList$: Observable<Offer[]>;
    noImageUrl = IMAGE_SETTINGS.NO_IMAGE;
    noPriceText = 'noPrice';
    filterParam: [];
    citySearch: { region: string; city: string };
    region: string;

    constructor(
        private offerService: OfferService,
        private modalController: ModalController,
        private cities: CitiesService
    ) {
    }

    ngOnInit() {

        this.offerList$ = this.offerService.getList();
    }


    onClickFilterModalOpen() {
        this.presentModal().then(data => {
            this.filterParam = data.category;
            this.citySearch = {
                region: data.city,
                city: data.city
            }
            ;
            this.region = data.region;
        });
    }

    async presentModal() {

        const modal = await this.modalController.create({
            component: OfferFilterModalPage,
            componentProps: {
                'current': this.filterParam,
                'city': this.citySearch,
                'region': this.region
            }
        });

        await modal.present();

        const {data} = await modal.onDidDismiss();

        return data;
    }

}
