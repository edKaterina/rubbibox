import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FavoriteService} from '../../../services/user/favorite.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

@Pipe({name: 'deletedPipe'})
export class DeletedPipe implements PipeTransform {
    transform(value: any, deleted: string[]): any {
        console.log('before deleted', value);

        if (deleted.length === 0) {
            return value;
        }
        value = value.filter(item => deleted.indexOf(item.id) === -1);
        return value;
    }
}

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.page.html',
    styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {
    myFavorites;
    deleted: BehaviorSubject<string[]> = new BehaviorSubject([]);

    constructor(private favoriteServise: FavoriteService,
                private alertController: AlertController) {
    }

    ionViewDidEnter() {
        this.myFavorites = this.favoriteServise.getMyFavorites().pipe(switchMap((items: any) => {
            return this.deleted.pipe(map((deletedItemsId) => {
                return Object.keys(items).reduce((its, type) => {
                    const arrType = items[type].filter((item: { id: string, data: any }) => deletedItemsId.indexOf(item.id) === -1);
                    if (arrType.length > 0) {
                        its[type] = arrType;
                    }
                    return its;
                }, {});

            }));
        }));
    }

    deleteFavorite(event) {
        this.presentAlertConfirm(event);

    }

    async presentAlertConfirm(event) {
        const alert = await this.alertController.create({
            message: 'Удалить из  избранного?',
            buttons: [
                {
                    text: 'Отмена',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Да',
                    handler: () => {
                        this.favoriteServise.setFavor(event.type, event.id, false).then(value => {
                            const del = this.deleted.getValue();
                            del.push(event.id);
                            this.deleted.next(del);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}
