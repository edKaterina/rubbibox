import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    public toastController: ToastController,
    private translateService: TranslateService
  ) { }

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
}
