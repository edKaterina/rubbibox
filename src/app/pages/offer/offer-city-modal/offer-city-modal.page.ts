import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CitiesService} from '../../../services/cities.service';




@Component({
    selector: 'app-offer-city-modal',
    templateUrl: './offer-city-modal.page.html',
    styleUrls: ['./offer-city-modal.page.scss'],
})
export class OfferCityModalPage implements OnInit {
    categoryList;
    regionList;
    cityList;
    search;
    @Input() current;
    @Input() city;
    @Input() region;

    constructor(
        private modalController: ModalController,
        private cities: CitiesService
    ) {

    }

    ngOnInit() {
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
                this.search = undefined;
            }
        );
    }
    onClickBackButton() {
        if (this.region) {
            this.onClickBack();
        } else {
            this.onClickBack();
            this.onClickApply();
        }
    }
    onClickBack() {
        this.city = undefined;
        this.region = undefined;
        this.search = undefined;
    }

    onClickCity(name) {
        this.city = name;
        this.onClickApply();
        // this.search = name;
    }

    onClickRefresh() {
        this.categoryList.map(item => item.toggle = true);
        this.city = undefined;
        this.region = undefined;
        this.onClickApply();
    }

    onClickApply() {
        this.modalController.dismiss({
            'city': this.city,
            'region': this.region
        });
    }
}
