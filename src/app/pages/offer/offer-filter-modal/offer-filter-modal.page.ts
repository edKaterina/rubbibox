import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OfferService} from '../../../services/offer/offer.service';
import {map} from 'rxjs/operators';
import {Offer} from '../../../interfaces/model/offer';

@Pipe({
    name: 'cityFilter'
})
export class CityFilterPipe implements PipeTransform {

    transform(value: Array<any>, searchCity: string): any {

        if (!searchCity) {
            return value;
        }

        return value.filter((city) =>
            city.name.toUpperCase().indexOf(searchCity.toUpperCase()) > -1
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
    cityList;
    citySearch;
    @Input() current;
    @Input() city;

    constructor(
        private modalController: ModalController,
        private offerService: OfferService
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
        this.offerService.getCityList()
            .pipe(
                map(cities => cities.map(city => {
                        city.data.toggle = false;

                        return city.data;
                    }),
                )
            )
            .subscribe((city) => {
                this.cityList = city;
                this.citySearch = this.city;
            });

    }


    onClickCity(name) {
        this.citySearch = name;
    }

    onClickRefresh() {
        this.categoryList.map(item => item.toggle = true);
        this.citySearch = undefined;
        this.onClickApply();
    }

    onClickApply() {
        this.modalController.dismiss({
            'category': this.categoryList,
            'city': this.citySearch,
        });
    }

}
