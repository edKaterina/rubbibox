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

    transform(value: Array<any>, searchCity: { search: string, city: string }): any {

        if (!searchCity.search) {
            return value;
        }

        return value.filter((city) => {

                if (city.city) {
                    if (searchCity.city === city.city) {
                        return true;
                    }
                    return (city.city.toUpperCase().indexOf(searchCity.search.toUpperCase()) > -1);
                } else {
                    return (city.toUpperCase().indexOf(searchCity.search.toUpperCase()) > -1);
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
                map(category => category.map(cat => ({...cat, toggle: true, isOpen: false}))),
                map(category => category.map(cat => {
                    return {
                        ...cat,
                        childrenCategory: cat.childrenCategory.map(children => ({name: children, toggle: true}))
                    }
                })),
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
                console.log(category)
                this.categoryList = category;

            });


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
                this.search = undefined;
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
        // this.search = name;
    }

    onClickRefresh() {
        this.categoryList.map(item => item.toggle = true);
        this.categoryList.map(item => item.childrenCategory.map(child => child.toggle = true));
        this.city = undefined;
        this.region = undefined;
        this.onClickApply(true);
    }

    toggleOpen(cat) {
        this.categoryList = this.categoryList.map(item => {
            if (item.name === cat.name) {
                item.isOpen = !item.isOpen;
            }
            return item;
        });
    }
    checkChildToggle(cat) {
        this.categoryList = this.categoryList.map(item => {
            if (item.name === cat.name && !item.toggle) {
                item.childrenCategory = item.childrenCategory.map(child => {
                    child.toggle = false;
                    return child;
                });
            }
            return item;
        });
    }
    checkMainToggle(cat){
        this.categoryList = this.categoryList.map(item => {
            if (item.name === cat.name) {
                item.toggle = !item.childrenCategory.reduce((res, child) => !child.toggle && res, true);
            }
            return item;
        });
    }
    onClickApply(refresh?) {
        this.region = this.city ? this.region : '';
        this.modalController.dismiss({
            'category': this.categoryList,
            'city': this.city,
            'region': this.region,  filtred: refresh || false
        });
    }

}
