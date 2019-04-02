import { AuthService } from './auth.service';
import { AdModel } from './../model/ad-model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  public static typeAds = 'ads';  // Объявления
  public AdSubscriptionList: Array<AdModel>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private storage: Storage
  ) { }

  // Список объявлений пользователя из кэша прошлого ответа сервера
  getAdListUserCache() {
    return this.storage.get('cache_myAd');
  }

  // Список объявлений пользователя
  getAdListUserServer(user: string): Observable<AdModel[]> {
    const list = this.db.list(AdService.typeAds, ref => {
      return ref.orderByChild('user').equalTo(user);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val() as AdModel;
        data.key = a.payload.key;
        return data;
      }))
    );
    list.subscribe(items => {
      this.storage.set('cache_myAd', items);
    });

    return list;
  }

  // Список объявлений включенных в подписке из кэша прошлого ответа сервера
  getAdSubscriptionListCache() {
    return this.storage.get('cache_AdSubscriptionList');
  }

  // Список объявлений включенных в подписке
  getAdSubscriptionList(settingCategory: Array<string>): ReplaySubject<AdModel[]> {
    this.AdSubscriptionList = [];
    const arrayResult: ReplaySubject<AdModel[]> = new ReplaySubject(1);

    if (settingCategory.length === 0) {
      arrayResult.next([]);
      this.storage.set('cache_AdSubscriptionList', []);
    }

    settingCategory.forEach((element, index) => {
      const list = this.getAdList(element as string)
        .snapshotChanges().pipe(map(actions => {
          return actions.map(a => {
            const data2 = a.payload.val() as AdModel;
            data2.key = a.payload.key;
            return data2;
          });
        }));

      list.subscribe(items => {
        // список объявления для добавления
        const addAd = [];

        // список ключей объявлений для удаления
        const deleteAdKeys = this.AdSubscriptionList.filter((item) => {
          return (item as AdModel).category === element;
        }).map(item => {
          return item.key;
        });

        items.forEach(item => {
          const pos = deleteAdKeys.indexOf(item.key);
          if (pos === -1) {
            addAd.push(item);
          } else {
            deleteAdKeys.splice(pos, 1);
          }
        });

        if (deleteAdKeys.length > 0) {
          // есть что удалить
          this.AdSubscriptionList = this.AdSubscriptionList.filter((item) => {
            return deleteAdKeys.indexOf(item.key) === -1;
          });
        }

        if (addAd.length > 0) {
          // есть что добавить
          this.AdSubscriptionList = this.AdSubscriptionList.concat(addAd);
        }

        if (index + 1 === settingCategory.length)
          arrayResult.next(this.AdSubscriptionList);
        this.storage.set('cache_AdSubscriptionList', this.AdSubscriptionList);
      });
    });

    return arrayResult;
  }

  // Список объявлений категории
  getAdList(category: string): AngularFireList<AdModel> {
    return this.db.list(AdService.typeAds, ref => {
      return ref.orderByChild('category').equalTo(category);
    });
  }

  // Информация по объявлению
  getAdDetail(id: string): AngularFireObject<AdModel> {
    return this.db.object(AdService.typeAds + '/' + id);
  }

  // Добавить объявление
  addAd(note: AdModel): Promise<any> {
    note.user = this.authService.getLogin();
    note.dateCreate = new Date().toISOString();

    return this.db.list(AdService.typeAds).push(note);
  }

  // Добавить объявление
  addAdForFields(note: any): Promise<any> {
    note['user'] = this.authService.getLogin();
    note['dateCreate'] = new Date().toISOString();

    return this.db.list(AdService.typeAds).push(note);
  }

  // Удалить объявление
  removeAd(note: AdModel) {
    return this.db.list(AdService.typeAds).remove(note.key);
  }

}
