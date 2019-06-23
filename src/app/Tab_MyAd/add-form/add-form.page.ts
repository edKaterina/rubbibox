import {AdService} from './../../services/ad.service';
import {Component, OnInit} from '@angular/core';
import {AdModel} from '../../model/ad-model';
import {Router} from '@angular/router';
import {CategoryService} from './../../services/category.service';
import {TypeField} from '../../model/ad-fields';
import {NgForm} from '@angular/forms';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../interfaces/model/offer';

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.page.html',
    styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {

    typeField = TypeField;
    categoryList$: any;
    fields: any;

    photo = [];

    constructor(
        private router: Router,
        private offerService: OfferService
    ) {
    }

    ngOnInit() {
        this.categoryList$ = this.offerService.getCategoryList();

    }

    onSubmit(form: NgForm) {

        const offer: Offer = {
            data: {
                ...form.value,
                arImg: this.photo,
                dateCreate: (new Date()).toISOString()
            }
        };

        this.offerService.add(offer);

        form.reset();

        this.router.navigate(['/system/profile']);
    }
}
