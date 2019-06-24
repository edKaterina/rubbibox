import {AuthService} from './../services/auth.service';
import {Component} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {TabsController} from '../services/tabs.controller';

@Component({
    selector: 'app-tabs',
    templateUrl: 'system.page.html',
    styleUrls: ['system.page.scss']
})
export class SystemPage {

    tabsBarShow$;

    public countBadge: number;

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private tabsController: TabsController
    ) {

        this.tabsBarShow$ = tabsController.isTabsBarShow$;

        //this.notificationService.initNotify();
        this.notificationService.getBadge().subscribe(count => {
            this.countBadge = count;
        });
    }
}
