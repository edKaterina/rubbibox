import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { CoreService } from './core.service';
import { FIREBASE_CONFIG } from '../../firebase.credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public state: ReplaySubject<firebase.User> = new ReplaySubject(1);

  constructor(
    private db: AngularFireDatabase,
    private httpClient: HttpClient,
    private coreService: CoreService
  ) {
    firebase.auth().onAuthStateChanged(authData => {
      if (authData != null) {
        console.log('onAuthStateChanged', authData.uid);
        this.state.next(authData);
      } else {
        firebase.auth().signInAnonymously();
      }
    });
  }

  // авторизация пользователя
  // возвращает в промис логин пользователя
  async auth() {
    return new Promise((resolve, reject) => {
      this.state.subscribe(authData => {
        resolve(authData.uid);
      });
    });
  }

  // Сохраненный логин авторизованного пользователя
  getLogin(): string {
    return firebase.auth().currentUser.uid;
  }

  // Присоединение номера телефона к аккаунту
  linkAuthPhone(phone: string) {
    if (!phone) {
      this.coreService.presentToast('Введите номер телефона');
      return;
    }

    if (phone.substr(0, 1) === '+') {
      phone = phone.substr(1);
    }

    const server = `https://us-central1-${FIREBASE_CONFIG.projectId}.cloudfunctions.net`;
    const uid = firebase.auth().currentUser.uid;

    this.httpClient.get(`${server}/getAuthID?phone=${phone}&uid=${uid}`).subscribe(data => {
      if (data['error']) {
        this.coreService.presentToast(data['error']);
        return;
      }

      document.location.href = data['call'];
      this.db.object(`authHistory/${data['key']}/call_id`).valueChanges().subscribe(value => {
        if (value) {
          firebase.auth().signInWithCustomToken(value as string);
        }
      });
    });
  }

  // выход из учетной записи
  logout() {
    firebase.auth().signOut();
  }
}
