import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CoreService } from './core.service';
import { CategoryService } from './category.service';
import { PushObject, Push, PushOptions } from '@ionic-native/push/ngx';
import { Router } from '@angular/router';
import { NotifyModel } from '../model/notify-model';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public static typeNotifications = 'notifications';  // Уведомления
  public static typePush = 'push';                    // Токены для отправки Push

  private pushObject: PushObject;
  private settingCategory: any = [];
  private countBadge = '';


  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private coreService: CoreService,
    private categoryService: CategoryService,
    private storage: Storage,
    private push: Push,
    private router: Router
  ) {
    this.storage.get('settingCategory').then(value => {
      this.settingCategory = value;
    });
  }

  // Инициализация Push-уведомлений
  initPush() {
    this.categoryService.getOnCategory().subscribe(value => {
      value.then(value1 => {
        let isChangeSetting = false;

        if (this.settingCategory) {
          if (this.settingCategory.length !== value1.length) {
            isChangeSetting = true;
          } else {
            if (this.settingCategory.toString() !== value1.toString()) {
              console.log(value1.toString());
              isChangeSetting = true;
            }
          }
        } else {
          isChangeSetting = true;
        }

        if (isChangeSetting) {
          console.log('Изменены настройки: ', value1);
        }

        this.settingCategory = value1;
        this.storage.set('settingCategory', this.settingCategory);

        const topicsEng: any = [];

        this.settingCategory.forEach(element => {
          topicsEng.push(this.transliterate(element));
        });
        console.log(topicsEng);

        if (topicsEng.length > 0) {
          const options: PushOptions = {
            android: {
              topics: topicsEng,
              sound: true
            },
            ios: {
              alert: true,
              badge: true,
              sound: true,
              topics: topicsEng
            }
          };

          this.pushObject = this.push.init(options);

          this.pushObject.on('notification').subscribe((notification: any) => {
            console.log('Received a notification', notification);
            console.log(notification);

            if (notification.additionalData.foreground === false) {
              // переход с Push по нажатию
              this.router.navigateByUrl(notification.additionalData.url);
            } else {
              this.coreService.presentToast('Новое уведомление');
            }
          });

          this.pushObject.on('registration').subscribe((registration: any) => {
            this.saveTokenPush(registration['registrationId']);
          });
        }
      });
    });
  }

  // Сохранение токена для отправки Push-уведомлений
  saveTokenPush(token: string) {
    this.authService.auth().then(value => {
      this.db.object(NotificationService.typePush + '/' + this.authService.getLogin()).update({
        'token': token
      });
    });
  }

  // Запись уведомления пользователя
  updateNotify(category: string, userID: string, notify: NotifyModel) {
    notify.dateCreate = new Date().toISOString();
    notify.user = this.authService.getLogin();
    notify.active = true;
    notify.isRead = false;
    return this.db.object(NotificationService.typeNotifications + '/' + userID + '/' + category + '_' + notify.user).update(notify);
  }

  // Список уведомлений авторизованного пользователя
  getNotify() {
    return this.db.list(NotificationService.typeNotifications + '/' + this.authService.getLogin());
  }

  // Количество непрочитанных уведомлений
  getBadge() {
    if (this.pushObject) {
      this.pushObject.setApplicationIconBadgeNumber(parseInt(this.countBadge, 10));
    }

    if (this.countBadge === '0') {
      return '';
    }

    return this.countBadge;
  }

  // Отметка о прочтении уведомления
  setMarkRead(key: string) {
    const subscription = this.db.object(NotificationService.typeNotifications + '/' + this.authService.getLogin() + '/' + key)
      .valueChanges().subscribe(value => {
        // console.log('setMarkRead');
        // console.log(value);
        subscription.unsubscribe();

        if (value) {
          if ((value as NotifyModel).subject) {
            this.db.object(NotificationService.typeNotifications + '/' + this.authService.getLogin() + '/' + key).update({
              isRead: true
            });
          }
        }
      });
  }

  // инициализация системы уведомлений
  initNotify() {
    this.authService.auth().then(login => {

      const notifyListNew = this.db.list(NotificationService.typeNotifications + '/' + this.authService.getLogin(), ref => {
        return ref.orderByChild('active').equalTo(true);
      }).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const id = a.payload.key;
          const data = a.payload.val() as NotifyModel;
          data.key = id;

          this.coreService.presentToast('Новое уведомление');
          this.db.object(NotificationService.typeNotifications + '/' + this.authService.getLogin() + '/' + data.key).update({
            active: false
          });

          return { id, ...data };
        }))
      );
      notifyListNew.subscribe();

      const notifyListNoRead = this.db.list(NotificationService.typeNotifications + '/' + this.authService.getLogin(), ref => {
        return ref.orderByChild('isRead').equalTo(false);
      }).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const id = a.payload.key;
          const data = a.payload.val() as NotifyModel;
          data.key = id;
          return { id, ...data };
        }))
      );
      notifyListNoRead.subscribe(value => {
        console.log('Количество непрочитанных уведомлений: ' + value.length);
        this.countBadge = value.length.toString();
      });
    });
  }

  // транлитерация
  transliterate(word: any) {
    let answer = '';
    const a = {};

    a['Ё'] = 'YO';
    a['Й'] = 'I';
    a['Ц'] = 'TS';
    a['У'] = 'U';
    a['К'] = 'K';
    a['Е'] = 'E';
    a['Н'] = 'N';
    a['Г'] = 'G';
    a['Ш'] = 'SH';
    a['Щ'] = 'SCH';
    a['З'] = 'Z';
    a['Х'] = 'H';
    a['Ъ'] = '';
    a['ё'] = 'yo';
    a['й'] = 'i';
    a['ц'] = 'ts';
    a['у'] = 'u';
    a['к'] = 'k';
    a['е'] = 'e';
    a['н'] = 'n';
    a['г'] = 'g';
    a['ш'] = 'sh';
    a['щ'] = 'sch';
    a['з'] = 'z';
    a['х'] = 'h';
    a['ъ'] = '';
    a['Ф'] = 'F';
    a['Ы'] = 'I';
    a['В'] = 'V';
    a['А'] = 'a';
    a['П'] = 'P';
    a['Р'] = 'R';
    a['О'] = 'O';
    a['Л'] = 'L';
    a['Д'] = 'D';
    a['Ж'] = 'ZH';
    a['Э'] = 'E';
    a['ф'] = 'f';
    a['ы'] = 'i';
    a['в'] = 'v';
    a['а'] = 'a';
    a['п'] = 'p';
    a['р'] = 'r';
    a['о'] = 'o';
    a['л'] = 'l';
    a['д'] = 'd';
    a['ж'] = 'zh';
    a['э'] = 'e';
    a['Я'] = 'Ya';
    a['Ч'] = 'CH';
    a['С'] = 'S';
    a['М'] = 'M';
    a['И'] = 'I';
    a['Т'] = 'T';
    a['Ь'] = '';
    a['Б'] = 'B';
    a['Ю'] = 'YU';
    a['я'] = 'ya';
    a['ч'] = 'ch';
    a['с'] = 's';
    a['м'] = 'm';
    a['и'] = 'i';
    a['т'] = 't';
    a['ь'] = '';
    a['б'] = 'b';
    a['ю'] = 'yu';
    a[' '] = '_';

    for (const i in word) {
      if (word.hasOwnProperty(i)) {
        if (a[word[i]] === undefined) {
          answer += word[i];
        } else {
          answer += a[word[i]];
        }
      }
    }
    return answer.toLowerCase();
  }
}
