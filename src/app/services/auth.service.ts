import {Injectable} from '@angular/core';
// import * as firebase from 'firebase/app';
import {ReplaySubject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {HttpClient} from '@angular/common/http';
import {CoreService} from './core.service';
import {FIREBASE_CONFIG} from '../../firebase.credentials';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {Firebase} from '@ionic-native/firebase/ngx';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public state: ReplaySubject<firebase.User> = new ReplaySubject(1);
    facebook;
    google;
    windowRef: any;
    verificationId;

    constructor(
        private db: AngularFireDatabase,
        private httpClient: HttpClient,
        private coreService: CoreService,
        private afAuth: AngularFireAuth,
        private router: Router,
        private platform: Platform,
        private firebasePlugin: Firebase,
    ) {

        firebase.auth().onAuthStateChanged(authData => {
            if (authData != null) {
                console.log('onAuthStateChanged', authData.uid);
                this.state.next(authData);
            } else {
                // firebase.auth().signInAnonymously();
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

    getCurrentUser() {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject('No user logged in');
                }
            });
        });
    }


    // Сохраненный логин авторизованного пользователя
    getLogin(): any {

        return firebase.auth().currentUser ? firebase.auth().currentUser.uid : false;
    }

    async authWait(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.state.subscribe((authData) => {
                resolve(authData.uid);
            }, (error => {
                console.log('Нет авторизации еще', error);
            }));
        });
    }

    // инициализация капчи для авторизации по смс
    initAuthSMS(win) {
        if (!this.platform.is('ios') && !this.platform.is('android')) {
            this.windowRef = win;
            this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                size: 'invisible'
            });
            this.windowRef.recaptchaVerifier.render();
        }
    }

    saveProfile(values?: { [key: string]: string }) {
        console.log('saveProfile', values);
        this.db.object(`users/${this.getLogin()}/phone`).set(values.phone);
    }

    // Подтверждает авторизацию по коду отправленному в методе sendPhone
    sendCode(code: string, values?: { [key: string]: string }): Promise<any> {
        this.coreService.presentLoading('Проверка кода');

        const credential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, code);
        return firebase.auth().signInAndRetrieveDataWithCredential(credential).then(result => {
            this.coreService.dismissLoading();
            if (values) {
                this.authWait().then(uid => {
                    if (uid) {
                        this.saveProfile(values);
                    }
                });
            }
            return result.user.uid;
        }).catch(error => {
            this.coreService.dismissLoading();
            this.coreService.presentAlert(error);
        });
    }

    // Подтверждает авторизацию по коду отправленному в методе sendPhone
    sendCodeChange(code: string, values?: { [key: string]: string }): Promise<any> {
        this.coreService.presentLoading('Проверка кода');

        const credential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, code);
        return firebase.auth().currentUser.updatePhoneNumber(credential).then(result => {
            this.coreService.dismissLoading();
            return result;
        }).catch(error => {
            this.coreService.dismissLoading();
            this.coreService.presentAlert(error);
        });
    }

    // авторизация, на телефон будет отправлен смс с кодом
    sendPhone(phone: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.coreService.presentLoading('Отправка смс');

            if (!phone.startsWith('+')) {
                phone = '+' + phone;
            }

            if (this.platform.is('ios') || this.platform.is('android')) {
                this.firebasePlugin.verifyPhoneNumber(phone, 60).then(id => {
                    this.verificationId = id.verificationId ? id.verificationId : id;
                    this.coreService.dismissLoading();
                    resolve('ok');
                }).catch(error => {
                    console.log('error: ' + error);
                    this.coreService.dismissLoading();
                    this.coreService.presentAlert(JSON.stringify(error));
                });
            } else {
                firebase.auth().signInWithPhoneNumber(phone, this.windowRef.recaptchaVerifier)
                    .then(result => {
                        this.coreService.dismissLoading();
                        this.verificationId = result.verificationId;
                        resolve('ok');
                    }).catch(error => {
                    this.coreService.dismissLoading();
                    this.coreService.presentAlert(JSON.stringify(error));
                });
            }
        });
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
