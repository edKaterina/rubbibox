import { Injectable } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  loading;

  constructor(
      public toastController: ToastController,
      private translateService: TranslateService,
      private navCtrl: NavController,
      public alertController: AlertController,
      public loadingController: LoadingController,
      private router: Router
  ) {
  }

  back() {
    this.navCtrl.back();
  }

  // диалоговое окно с ошибкой
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Ошибка',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  // отображение ожидания загрузки
  async presentLoading(msg: string) {
    this.loading = await this.loadingController.create({
      message: msg
    });
    this.loading.present();
  }

  // закрыть отображение загрузки
  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();

    }
  }

  // Ограничение кол-ва символов в поле данных
  public static trimField(data: any, field: string, count: number) {
    if (data[field]) {
      if (data[field].length > count) {
        data[field] = data[field].slice(0, count) + '...';
      }
    }
  }

  // информационное всплывающее сообщение на 2 секунды
  async presentToast(mess: string) {
    this.translateService.get(mess).subscribe(async (res: string) => {
      const toast = await this.toastController.create({
        message: res,
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    });
  }

  async presentToastToUrl(mess: string, url: string) {
    this.translateService.get(mess).subscribe(async (res: string) => {
      const toast = await this.toastController.create({
        message: res,
        duration: 2000,
        color: 'danger',
        buttons: [
          {
            text: 'Перейти',
            handler: () => {
              console.log('clicked', url);
              this.router.navigateByUrl(url);
            }
          }
        ]
      });
      toast.present();
    });
  }
}
