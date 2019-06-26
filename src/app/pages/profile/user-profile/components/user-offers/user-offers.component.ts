import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../../../../services/offer/offer.service";
import {Offer} from "../../../../../interfaces/model/offer";
import {IMAGE_SETTINGS} from "../../../../../config/no-image.settings";

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.scss']
})
export class UserOffersComponent implements OnInit {

  noImageUrl = IMAGE_SETTINGS.NO_IMAGE;
  noPriceText = 'Цена не указана';

  constructor(private offerService: OfferService) { }

  offers: Array<Offer>;

  ngOnInit() {
      this.offerService.getMy().subscribe((offers:Array<Offer>)=>{this.offers = offers});
  }

  remove(offer){
      this.offerService.delete(offer);
  }

}