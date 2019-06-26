import { Injectable } from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    public toastController: ToastController,
    private translateService: TranslateService,
    public loadingController: LoadingController,
  ) { }

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

  //Спиннер загрузки с сообщением
  async presentLoading(mess: string) {
      const loading = await this.loadingController.create({
          message: mess,
      });
      await loading.present();
  }

  //Закрытие спиннера
  dismissLoading(){
      this.loadingController.dismiss();
  }

}
