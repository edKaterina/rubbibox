import {AuthService} from './services/auth.service';
import {Component, NgZone} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {NavigationEnd, Router} from '@angular/router';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {OfferDetailPage} from './pages/offer/offer-detail/offer-detail.page';

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
        private screenOrientation: ScreenOrientation,
        private appMinimize: AppMinimize,
        private router: Router,
        private deeplinks: Deeplinks,
        private zone: NgZone,
        public translateService: TranslateService
    ) {
        this.translateService.setDefaultLang('ru');
        this.translateService.use('ru');

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
            this.deeplinks.route({
                '/detail/:id': OfferDetailPage,
            }).subscribe(match => {
                // match.$route - the route we matched, which is the matched entry from the arguments to route()
                // match.$args - the args passed in the link
                // match.$link - the full link data
                console.log('Successfully matched route', match);
                alert(match);
                this.zone.run(() => {
                    this.router.navigate(['/system/offers/offer', match.$args.id]);
                    alert(match);
                });
            }, nomatch => {
                // nomatch.$link - the full link data
                //alert(nomatch);
                console.error('Got a deeplink that didn\'t match', nomatch);
            });

            if (this.platform.is('android')) {
                this.statusBar.styleLightContent();
                this.initMinimizeAndroid();
            } else {
                this.statusBar.styleDefault();
            }

            //this.notificationService.initPush();
            this.splashScreen.hide();
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
                '/system/offers',
                '/system/dialogs',
                '/system/profile',
            ];
            if (listFirstURL.indexOf(this.currentURL) >= 0) {
                this.appMinimize.minimize();
            }
        });
    }
}
