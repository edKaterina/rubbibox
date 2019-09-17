import {Injectable} from '@angular/core';
import {DbService} from '../core/db.service';
import {AuthService} from '../auth.service';
import {combineAll, first, map, switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from './user.service';
import {combineLatest, forkJoin} from 'rxjs';
import {OfferService} from '../offer/offer.service';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    public static path = 'favorite';

    constructor(
        private db: AngularFireDatabase,
        private dbService: DbService,
        private authService: AuthService,
        private userService: UserService,
        private addService: OfferService
    ) {
    }

    isFavor(type, id) {
        return this.db.object(FavoriteService.path + '/' + this.authService.getLogin() + '/' + type + '/' + id)
            .snapshotChanges()
            .pipe(map(item => item.payload.val()
            ));
    }

    getMyFavorites() {
        return this.dbService.getList(FavoriteService.path + '/' + this.authService.getLogin()).pipe(
            map((favors) => {

                return favors.reduce((object, item: { id: string, data: any }, index) => {
                    object[item.id] = Object.keys(item.data);
                    return object;
                }, {});

            }),
            switchMap((items: any) => {
                const res: any = {};
                if (items.users) {
                    res.users = forkJoin(items.users.map(item => {
                        return this.userService.getById(item);
                    }));

                }
                if (items.adds) {
                    res.adds = forkJoin(items.adds.map(item => {
                        return this.addService.getById(item);
                    }));

                }

                return forkJoin(
                    res
                );
            }),
            first()
        );
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
