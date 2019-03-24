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
import { Push } from '@ionic-native/push/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: ''
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
