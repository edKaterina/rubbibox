import { Injectable } from '@angular/core';
import {DbService} from '../core/db.service';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/model/user';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public static path = 'users';

    constructor(
        private db: DbService,
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
