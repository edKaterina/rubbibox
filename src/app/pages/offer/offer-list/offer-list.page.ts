import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OfferFilterModalPage} from '../offer-filter-modal/offer-filter-modal.page';
import {OfferService} from '../../../services/offer/offer.service';
import {Observable} from 'rxjs';
import {Offer} from '../../../interfaces/model/offer';


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


@Component({
    selector: 'app-offer-list',
    templateUrl: './offer-list.page.html',
    styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit {

    offerList$: Observable<Offer[]>;

    filterParam: [];


    constructor(
        private offerService: OfferService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.offerList$ = this.offerService.getList();

    }


    onClickFilterModalOpen() {
        this.presentModal().then(data => {
            this.filterParam = data;
        });
    }

    async presentModal() {

        const modal = await this.modalController.create({
            component: OfferFilterModalPage,
            componentProps: {
                'current': this.filterParam,
            }
        });

        await modal.present();

        const {data} = await modal.onDidDismiss();

        return data.result;
    }

}
