import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {CoreService} from '../../../services/core.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.page.html',
    styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage {

    public countBadge: number;
    public isShow: {};

    constructor(
        private notivicationService: NotificationService,
        private coreService: CoreService,
    ) {
        this.coreService.getSettings().subscribe((setting) => {
            this.coreService.setCacheSettings(setting);
        });
        this.coreService.getCacheSettings().then((setting) => {
            this.isShow = setting;
        });
        this.notivicationService.getBadge().subscribe(count => {
            this.countBadge = count;
        });
    }
}
