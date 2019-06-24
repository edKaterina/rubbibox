import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FIREBASE_CONFIG } from '../firebase.credentials';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { Badge } from '@ionic-native/badge/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import {AngularFireAuthModule} from "@angular/fire/auth";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicStorageModule.forRoot({
      name: 'RTPlatform',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    Badge,
    ScreenOrientation,
    InAppBrowser,
    AppMinimize,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
