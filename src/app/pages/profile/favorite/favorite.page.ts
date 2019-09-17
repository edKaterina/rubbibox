import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FavoriteService} from '../../../services/user/favorite.service';
import {tap} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';

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
    deleted: string [] = [];

    constructor(private favoriteServise: FavoriteService,
                private alertController: AlertController) {
    }

    ionViewDidEnter() {
        this.myFavorites = this.favoriteServise.getMyFavorites();
    }

    deleteFavorite(event) {
        this.presentAlertConfirm(event);
        this.favoriteServise.setFavor(event.type, event.id, false).then(value => {
            this.deleted.push(event.id);
        });
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
                            this.deleted.push(event.id);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}
