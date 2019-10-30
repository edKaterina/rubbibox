import {Component, OnInit} from '@angular/core';
import {OfferService} from '../../../../../services/offer/offer.service';
import {Offer} from '../../../../../interfaces/model/offer';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-user-offers',
    templateUrl: './user-offers.component.html',
    styleUrls: ['./user-offers.component.scss']
})
export class UserOffersComponent implements OnInit {

    noImageUrl = IMAGE_SETTINGS.NO_IMAGE;

    constructor(private offerService: OfferService,
        public alertController: AlertController,
        private translateService: TranslateService,
        ) {
    }

    offers;
    async presentAlert(offer) {
        this.translateService.get(['cancel',"yes",'delQuest']).subscribe(async (res: string) => {
            const alert = await this.alertController.create({
               
                message: res["delQuest"],
                buttons:  [
                    {
                      text: res["cancel"],
                      role: "cancel",
                    
                    },
                    {
                        text: res["yes"],
    
                        handler: () => {
                          this.remove(offer);
                        }
                      }
                  ]
              });
          
              await alert.present();
          });
       
      }
    ngOnInit() {
        this.offers =   this.offerService.getMy();
    }

    remove(offer) {
        this.offerService.delete(offer);
    }

}
