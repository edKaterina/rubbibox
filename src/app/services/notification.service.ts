import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CoreService } from './core.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { NotifyModel } from '../model/notify-model';
import { map } from 'rxjs/operators';
import 'firebase/auth';
import { Subject, ReplaySubject } from 'rxjs';
import { Badge } from '@ionic-native/badge/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public static typeNotifications = 'notifications';  // Уведомления
  public static typePush = 'push';                    // Токены для отправки Push

  private countBadge: ReplaySubject<number>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private coreService: CoreService,
    private fcm: FCM,
    private router: Router,
    private badge: Badge
  ) {
    this.countBadge = new ReplaySubject(1);
  }

  // Подписка на топик Push-уведомлений
  subscribeToTopic(topic: string) {
    this.fcm.subscribeToTopic(this.transliterate(topic));
  }

  // Отписка от топика Push-уведомлений
  unsubscribeFromTopic(topic: string) {
    this.fcm.unsubscribeFromTopic(this.transliterate(topic));
  }

  // Инициализация Push-уведомлений без условий
  // на входе массив топиков на которые нужно подписаться или пустой массив
  initPush(topicsEng?: Array<string>) {
    this.fcm.getToken().then(token => {
      this.saveTokenPush(token);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.saveTokenPush(token);
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        this.router.navigateByUrl(data.url);
      } else {
        this.coreService.presentToast('Новое уведомление');
      }
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
    this.db.object(NotificationService.typeNotifications + '/' + userID + '/' + category + '_' + notify.user).update(notify);
  }

  // Список уведомлений авторизованного пользователя
  getNotify(): AngularFireList<NotifyModel> {
    return this.db.list(NotificationService.typeNotifications + '/' + this.authService.getLogin());
  }

  // Подписка на количество непрочитанных уведомлений
  getBadge(): Subject<number> {
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
    this.authService.state.subscribe(authData => {
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
        this.countBadge.next(value.length);

        this.badge.set(value.length);
      });
    });
  }

  // транлитерация
  transliterate(word: any): any {
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
    a['('] = '';
    a[')'] = '';

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
