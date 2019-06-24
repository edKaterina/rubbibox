import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fAuth: AngularFireAuth) {
    }

    // Сохраненный логин авторизованного пользователя
    getLogin() {
        const uid = this.fAuth.auth.currentUser.uid;
        return uid?uid:null;
    }

    // выход из учетной записи
    logout() {
        return this.fAuth.auth.signOut();
    }

}
