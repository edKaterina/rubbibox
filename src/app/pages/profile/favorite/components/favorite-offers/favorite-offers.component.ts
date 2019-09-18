import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-favorite-adds',
    templateUrl: './favorite-offers.component.html',
    styleUrls: ['./favorite-offers.component.scss']
})
export class FavoriteOffersComponent implements OnInit {
    @Input() data;
    @Output() delete: EventEmitter<any> = new EventEmitter();
    hidden = true;
    noImageUrl = IMAGE_SETTINGS.NO_IMAGE;

    constructor(
        private navController: NavController
    ) {
    }

    ngOnInit() {
    }

    go(id) {
        this.navController.navigateForward(['/system/offers/offer/', id]);
    }

    deleteFavorite(id) {
        this.delete.emit({id, type: 'adds'});
    }
}
