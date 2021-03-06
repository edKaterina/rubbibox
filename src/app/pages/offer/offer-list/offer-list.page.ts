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

    transform(value: Array<any>, options: Array<any>): any {

        if (!options || !options.length) {
            return value;
        }
        return value.filter((offer) => options.some(opt =>
            opt.toggle && (offer.data.childrenCategory ? opt.childrenCategory.some(children => children.name === offer.data.childrenCategory && children.toggle) : offer.data.category === opt.name)
        ));

    }


}

@Pipe({
    name: 'cityCatFilter'
})
export class CityCatFilterPipe implements PipeTransform {

    transform(value: Array<Offer>, options: any): any {

        if (!options || !options.city) {
            return value;
        }

        return value.filter((offer) => options.city === offer.data.city.city && options.region === offer.data.city.region);

    }


}

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(value: Array<Offer>, option: string): any {

        if (!option) {
            return value;
        }
        return value.filter((offer) => offer.data.name.toLowerCase().indexOf(option.toLowerCase()) > -1 || offer.data.description.toLowerCase().indexOf(option.toLowerCase()) > -1);
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
    isOpenSearch: Boolean = false;
    searchString: string;
    filterParam: [];
    filtred = false;
    citySearch: { region: string, city: string } = {region: '', city: ''};
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
    trackByFunction(index, item) {
        return item.id;
    }
    doRefresh(event) {
        this.offerList$ = this.offerService.getList();
        event.target.complete();
    }

    onClickFilterModalOpen() {
        this.presentModal().then(data => {

            this.filtred = !data.filtred;
            this.filterParam = data.category;
            this.citySearch = {
                region: data.region,
                city: data.city
            };
            this.region = data.region;
        });
    }

    async presentModal() {

        const modal = await this.modalController.create({
            component: OfferFilterModalPage,
            componentProps: {
                'current': this.filterParam,
                'city': this.citySearch.city,
                'region': this.citySearch.region
            }
        });

        await modal.present();

        const {data} = await modal.onDidDismiss();

        return data;
    }

    toggleOpenSearch() {
        this.isOpenSearch = !this.isOpenSearch;
    }

    onClickSearchOpen() {
        this.toggleOpenSearch();
    }

    onClickSearchClose() {
        this.searchString = '';
        this.toggleOpenSearch();
    }
}
