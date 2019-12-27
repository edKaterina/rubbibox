import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {IonicStorageModule} from '@ionic/storage';
import {FCM} from '@ionic-native/fcm/ngx';

import {Camera} from '@ionic-native/camera/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

import {Badge} from '@ionic-native/badge/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {FirebaseModule} from './modules/firebase/firebase.module';
import { Firebase } from '@ionic-native/firebase/ngx';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {NgxMaskModule} from 'ngx-mask';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({
            backButtonText: ''
        }),
        AppRoutingModule,
        IonicStorageModule.forRoot({
            name: 'RTPlatform',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FirebaseModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        FCM,
        Badge,
        ScreenOrientation,
        InAppBrowser,
        AppMinimize,
        Firebase,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Camera,
        PhotoViewer,
        Deeplinks,
        SocialSharing,
        Clipboard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
