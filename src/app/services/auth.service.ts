import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {map} from "rxjs/operators";

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

    // Сохраненный логин авторизованного пользователя(асинхронный)
    async auth(){
        const uid = await this.fAuth.user.pipe(map(user=>{return user.uid})).toPromise();
        return await uid?uid:null;
    }

    // выход из учетной записи
    logout() {
        return this.fAuth.auth.signOut();
    }

}
