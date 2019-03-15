import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FIREBASE_CONFIG } from '../../firebase.credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login: string;

  constructor(
  ) {
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().onAuthStateChanged(authData => {
      if (authData != null) {
        console.log('onAuthStateChanged');
        this.saveLogin(authData.uid);
      }
    });
  }

  // авторизация пользователя
  // возвращает в промис логин пользователя
  async auth() {
    return await firebase.auth().signInAnonymously().then(authData => {
      this.saveLogin(authData.user.uid);
      return authData.user.uid;
    });
  }

  // Сохраненный логин авторизованного пользователя
  getLogin() {
    return this.login;
  }

  // Сохранить логин пользователя
  saveLogin(user: string) {
    this.login = user;
  }
}
