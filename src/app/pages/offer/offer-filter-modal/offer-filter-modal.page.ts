import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OfferService} from '../../../services/offer/offer.service';
import {map} from 'rxjs/operators';
import {Offer} from '../../../interfaces/model/offer';
import {CitiesService} from '../../../services/cities.service';

@Pipe({
    name: 'cityFilter'
})
export class CityFilterPipe implements PipeTransform {

    transform(value: Array<any>, searchCity: string): any {

        if (!searchCity) {
            return value;
        }

        return value.filter((city) => {
                if (city.city) {
                    return (city.city.toUpperCase().indexOf(searchCity.toUpperCase()) > -1);
                } else {
                    return (city.toUpperCase().indexOf(searchCity.toUpperCase()) > -1);
                }
            }
        );

    }


}

@Component({
    selector: 'app-offer-filter-modal',
    templateUrl: './offer-filter-modal.page.html',
    styleUrls: ['./offer-filter-modal.page.scss'],
})
export class OfferFilterModalPage implements OnInit {

    categoryList;
    regionList;
    cityList;
    search;
    @Input() current;
    @Input() city;
    @Input() region;

    constructor(
        private modalController: ModalController,
        private offerService: OfferService,
        private cities: CitiesService
    ) {

    }

    ngOnInit() {
        this.offerService.getCategoryList()
            .pipe(
                map(category => category.map(cat => ({name: cat, toggle: true}))),
                map(options => {
                        if (!this.current || !this.current.length) {
                            return options;
                        }

                        return options.map(
                            option => {
                                return this.current.find(curOption => curOption.name === option.name) || option;
                            }
                        );

                    }
                )
            )
            .subscribe((category) => {
                this.categoryList = category;

            });
        this.search = this.region && this.city ? this.city : this.region;

        this.cities.getCitiesByRegion(this.region).subscribe(
            value => {
                this.cityList = value;
            }
        );
        this.cities.getRegions().subscribe(
            value => {
                this.regionList = value;
            }
        );


    }

    onClickRegion(region) {
        this.cities.getCitiesByRegion(region).subscribe(
            value => {
                this.cityList = value;
                this.region = region;
                this.city = undefined;
            }
        );

    }

    onClickBack() {
        this.city = undefined;
        this.region = undefined;
        this.search = undefined;
    }
    onClickCity(name) {
        this.city = name;
        this.search = name;
    }

    onClickRefresh() {
        this.categoryList.map(item => item.toggle = true);
        this.city = undefined;
        this.region = undefined;
        this.onClickApply();
    }

    onClickApply() {
        this.modalController.dismiss({
            'category': this.categoryList,
            'city': this.city,
            'region': this.region
        });
    }

}
