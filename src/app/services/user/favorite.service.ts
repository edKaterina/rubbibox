import {Injectable} from '@angular/core';
import {DbService} from '../core/db.service';
import {User} from '../../interfaces/model/user';
import {AuthService} from '../auth.service';
import {map, tap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    public static path = 'favorite';

    constructor(
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {
    }

    isFavor(type, id) {
        return this.db.object(FavoriteService.path + '/' + this.authService.getLogin() + '/' + type + '/' + id)
            .snapshotChanges()
            .pipe(map(item => item.payload.val()
            ));
    }

    setFavor(type, id, favor) {
        if (favor) {
            return this.db.object(FavoriteService.path + '/' + this.authService.getLogin() + '/' + type + '/' + id)
                .set(favor);
        } else {
            return this.db.object(FavoriteService.path + '/' + this.authService.getLogin() + '/' + type + '/' + id)
                .remove();
        }


    }
}
