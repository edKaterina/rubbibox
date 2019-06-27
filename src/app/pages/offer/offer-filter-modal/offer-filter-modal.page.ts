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

        if (!searchCity || !searchCity.length) {
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
    cityList = [
        {name: 'Казань', id: 1},
        {name: 'Нижний Новгород', id: 2},
        {name: 'Ярославль', id: 3},
        {name: 'Калининград', id: 4},
        {name: 'Екатеринбург', id: 5},
    ];
    citySearch;
    @Input() current;

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
                console.log(category);
            });

    }


    onClickClose() {
        this.modalController.dismiss({
            'result': this.categoryList
        });
    }

}
