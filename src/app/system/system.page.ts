import {AuthService} from './../services/auth.service';
import {Component} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: 'system.page.html',
    styleUrls: ['system.page.scss']
})
export class SystemPage {

    public enable = true;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
           if (event instanceof NavigationStart) { this.enable = true; }
        });
    }
}
