import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    public toastController: ToastController
  ) { }

  // информационное всплывающее сообщение на 2 секунды
  async presentToast(mess: string) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
