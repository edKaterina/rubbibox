import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';

@Component({
    selector: 'app-favorite-users',
    templateUrl: './favorite-users.component.html',
    styleUrls: ['./favorite-users.component.scss']
})
export class FavoriteUsersComponent implements OnInit {
    @Input() data;
    @Output() delete: EventEmitter<any> = new EventEmitter();
    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;

    hidden = true;

    constructor() {
    }

    ngOnInit() {
    }

    deleteFavorite(id) {
        this.delete.emit({id, type: 'users'});
    }
}
