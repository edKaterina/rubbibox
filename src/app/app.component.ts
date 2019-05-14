import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationService } from './services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    currentURL: string;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private notificationService: NotificationService,
        private screenOrientation: ScreenOrientation,
        private appMinimize: AppMinimize,
        private router: Router,
        public translateService: TranslateService
    ) {
        this.translateService.setDefaultLang('ru');
        this.translateService.use('ru');

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);


            if (this.platform.is('android')) {
                this.statusBar.styleLightContent();
                this.initMinimizeAndroid();
            } else {
                this.statusBar.styleDefault();
            }

            this.authService.auth().then(login => {
                this.notificationService.initPush();
                this.splashScreen.hide();
            });
        });
    }

    initMinimizeAndroid() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentURL = this.router.url;
            }
        });

        this.platform.backButton.subscribe(() => {
            const listFirstURL = [
                '/tabs/allAd',
                '/tabs/myAd',
                '/tabs/people',
                '/tabs/setting'
            ];
            if (listFirstURL.indexOf(this.currentURL) >= 0) {
                this.appMinimize.minimize();
            }
        });
    }
}
