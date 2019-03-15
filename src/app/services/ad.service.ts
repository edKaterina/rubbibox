import { AuthService } from './auth.service';
import { AdModel } from './../model/ad-model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  public static typeAds = 'ads';  // Объявления

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  // Список объявлений пользователя
  getAdListUser(user: string) {
    return this.db.list(AdService.typeAds, ref => {
      return ref.orderByChild('user').equalTo(user);
    });
  }

  // Список объявлений категории
  getAdList(category: string) {
    return this.db.list(AdService.typeAds, ref => {
      return ref.orderByChild('category').equalTo(category);
    });
  }

  // Информация по объявлению
  getAdDetail(id: string) {
    return this.db.object(AdService.typeAds + '/' + id);
  }

  // Добавить объявление
  addAd(note: AdModel) {
    note.user = this.authService.getLogin();
    note.dateCreate = new Date().toISOString();

    return this.db.list(AdService.typeAds).push(note);
  }

  // Удалить объявление
  removeAd(note: AdModel) {
    return this.db.list(AdService.typeAds).remove(note.key);
  }

}
