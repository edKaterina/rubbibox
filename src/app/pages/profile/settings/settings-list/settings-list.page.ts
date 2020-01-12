import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.page.html',
  styleUrls: ['./settings-list.page.scss'],
})
export class SettingsListPage {

  constructor(
      public authService: AuthService,
      private alertController: AlertController,
      private translateService: TranslateService
  ) {
  }

  async applyDeleteAlert() {
    this.translateService.get(['cancel', 'yes', 'delProfile']).subscribe(async (res: string) => {
      const alert = await this.alertController.create({

        message: res['delProfile'],
        buttons:  [
          {
            text: res['cancel'],
            role: 'cancel',

          },
          {
            text: res['yes'],

            handler: () => {
              this.authService.deleteCurrentUser();
            }
          }
        ]
      });

      await alert.present();
    });



  }

}
