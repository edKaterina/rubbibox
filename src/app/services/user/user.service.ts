import { Injectable } from '@angular/core';
import {DbService} from '../core/db.service';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/model/user';
import {AuthService} from '../auth.service';
import {AngularFireDatabase, AngularFireList, DatabaseSnapshot} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public static path = 'users';

    constructor(
        private db: DbService,
        private database: AngularFireDatabase,
        private authService: AuthService
    ) {
    }

    getList(): Observable<User[]> {
        return this.db.getList<User>(UserService.path);
    }

    getMy(): Observable<User> {
        return this.db.valueChangesById<User>(UserService.path, {id: this.authService.getLogin()});
    }

    getById(id: string): Observable<User> {
        return this.db.getById<User>(UserService.path, {id});
    }
    getByLogin(login: string): Observable<any> {
        return this.database.list(UserService.path, ref => ref.orderByChild('login').equalTo(login)).snapshotChanges().pipe(
            map(data =>
                data.map(a => ({id: a.payload.key, data: {...a.payload.val()}}))
            )
        );
    }

    add(user: User) {
        return this.db.push(UserService.path, user);
    }

    edit(user: User) {
        return this.db.edit(UserService.path, {id: user.id, data: user.data});
    }

    delete(id: string) {
        return this.db.delete(UserService.path, {id});
    }

}
