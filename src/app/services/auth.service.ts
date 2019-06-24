import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {first} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fAuth: AngularFireAuth) {
    }

    // Сохраненный логин авторизованного пользователя
    async auth() {
        const user = await this.fAuth.authState.pipe(first()).toPromise();
        return user ? user.uid : null;
    }

    // выход из учетной записи
    logout() {
        return this.fAuth.auth.signOut();
    }

}
