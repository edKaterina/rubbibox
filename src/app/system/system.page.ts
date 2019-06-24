import {AuthService} from './../services/auth.service';
import {Component} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-tabs',
    templateUrl: 'system.page.html',
    styleUrls: ['system.page.scss']
})
export class SystemPage {

    public enable = true;

    public countBadge: number;

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router
    ) {
        //this.notificationService.initNotify();
        this.notificationService.getBadge().subscribe(count => {
            this.countBadge = count;
        });
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
           if (event instanceof NavigationStart) this.enable = true;
        });
    }
}
