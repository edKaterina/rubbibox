import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireAuthGuardModule} from "@angular/fire/auth-guard";
import {AngularFireModule} from "@angular/fire";
import {FIREBASE_CONFIG} from "../../../firebase.credentials";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
  ]
})
export class FirebaseModule { }
