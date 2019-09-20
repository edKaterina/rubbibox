import {AuthService} from './services/auth.service';
import {Component, NgZone} from '@angular/core';

import {Platform, NavController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {NavigationEnd, Router} from '@angular/router';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {OfferDetailPage} from './pages/offer/offer-detail/offer-detail.page';
import { OfferUserPage } from './pages/offer/offer-user/offer-user.page';
import { UserProfilePage } from './pages/profile/user-profile/user-profile.page';
import { ProfilePageModule } from './pages/profile/user-profile/user-profile.module';

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
        private navController:NavController,
        public translateService: TranslateService
    ) {
        this.translateService.setDefaultLang('ru');
        this.translateService.use('ru');

        this.initializeApp();
    }
    handleOpenURL(url) {
        console.log("received url: " + url);
      }
    initializeApp() {
        
        this.platform.ready().then(() => {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
            this.deeplinks.routeWithNavController(this.navController,{}).subscribe(match => {
       
                this.navController.navigateForward(['/system/offers/'+match.$link.path]);
              
            }, nomatch => {
           
                console.error('Got a deeplink that didn\'t match', nomatch);
            });
            // this.deeplinks.route({
            //    }).subscribe(match => {
      
            //     alert(JSON.stringify(['/system/offers'+match.$link.path]));
            //     alert(JSON.stringify(match));
            //     this.navController.navigateForward(['/system/offers/'+match.$link.path]);

            // }, nomatch => {
          
            //     console.error('Got a deeplink that didn\'t match', nomatch);
            // });
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
