import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OfferService} from "../../../services/offer/offer.service";
import {AuthService} from "../../../services/auth.service";
import {SystemPage} from "../../../system/system.page";
import {NgForm} from "@angular/forms";
import {Offer} from "../../../interfaces/model/offer";

@Component({
  selector: 'app-offer-add-edit',
  templateUrl: './offer-add-edit.page.html',
  styleUrls: ['./offer-add-edit.page.scss'],
})
export class OfferAddEditPage implements OnInit {

    categoryList$: any;
    photo = [];

    constructor(
        private router: Router,
        private offerService: OfferService,
        private authService: AuthService,
        private tabs: SystemPage
    ) {
        this.tabs.enable = false;
    }

    ngOnInit() {
        this.categoryList$ = this.offerService.getCategoryList();

    }

    onSubmit(form: NgForm) {

        const uid = this.authService.getLogin();

        const offer: Offer = {
            data: {
                ...form.value,
                arImg: this.photo,
                dateCreate: (new Date()).toISOString(),
                owner: uid
            }
        };

        this.offerService.add(offer);

        form.reset();

        this.router.navigate(['/system/offers']);
    }
}
