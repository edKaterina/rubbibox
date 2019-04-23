import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/services/balance.service';
import { BalanceModel } from 'src/app/model/balance';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FIREBASE_CONFIG } from '../../../firebase.credentials';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  historyList: Observable<BalanceModel[]>;
  count = 0;
  currentBalance = 0;

  constructor(
    private iab: InAppBrowser,
    private balanceService: BalanceService,
    public alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.balanceService.currentBalanceCache().then(balance => {
      if (balance) {
        this.currentBalance = balance;
      }
    });
    this.authService.state.subscribe(authData => {
      this.balanceService.currentBalance().valueChanges().subscribe(balance => {
        this.currentBalance = balance;
        if (!balance) {
          this.currentBalance = 0;
        }
      });
      this.historyList = this.balanceService.history().valueChanges();
      this.historyList.subscribe(value => {
        this.count = value.length;
      });
    });
  }

  async payChoiceSum() {
    const alert = await this.alertController.create({
      header: 'Пополнение баланса',
      inputs: [
        {
          name: 'sum',
          type: 'number',
          placeholder: 'Сумма пополнения',
          min: 100,
          max: 15000
        }
      ],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Пополнить',
          handler: (value) => {
            this.pay(value['sum']);
          }
        }
      ]
    });

    await alert.present();
  }

  pay(sum: number) {
    this.authService.state.subscribe(authData => {
      const params = [];
      params.push('receiver=' + FIREBASE_CONFIG.yandexMoney);
      params.push('sum=' + sum);
      params.push('label=' + authData.uid);
      params.push('targets=Пополнение счета в RTPlatform');
      params.push('origin=form');
      params.push('selectedPaymentType=AC');
      params.push('quickpay-form=shop');

      const browser = this.iab.create('https://money.yandex.ru/transfer?' + params.join('&'));
      browser.show();
    });
  }

}
