import {Component, Input, OnInit} from '@angular/core';
import {IMAGE_SETTINGS} from '../../../../../config/no-image.settings';
import {User} from '../../../../../interfaces/model/user';
import {UserService} from '../../../../../services/user/user.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;

    user: Observable<User>;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.user = this.userService.getMy();
    }

}
