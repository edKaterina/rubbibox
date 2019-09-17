import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';

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
    @Input() deleted;

    constructor() {
    }

    ngOnInit() {
    }


    deleteFavorite(id) {
        this.delete.emit({id, type: 'adds'});
    }
}
