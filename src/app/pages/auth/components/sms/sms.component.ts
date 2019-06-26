import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {User} from "../../../../interfaces/model/user";
import {UserService} from "../../../../services/user/user.service";

@Component({
    selector: 'sms',
    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.scss'],
})
export class SmsAuthComponent implements AfterViewInit {

    public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    public phoneNumber;
    public code;
    public confirmationResult;

    constructor(
        private fAuth: AngularFireAuth,
        private userSerivce: UserService,
        private alertCtrl: AlertController,
        private navCtrl: NavController,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngAfterViewInit() {
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {'size': 'invisible'});
    }

    applyPhone() {
        const appVerifier = this.recaptchaVerifier;
        const phoneNumberString = '+'+this.phoneNumber.replace(/\D+/g, "");
        console.log(phoneNumberString);
        this.fAuth.auth.signInWithPhoneNumber(phoneNumberString, appVerifier).then(confirmationResult => {
            this.confirmationResult = confirmationResult;
            //this.cdr.detectChanges();
        }).catch((error) => {
            console.log(error);
        })
    }

    async applyCode() {
        const credential = firebase.auth.PhoneAuthProvider.credential(this.confirmationResult.verificationId, this.code);
        this.fAuth.auth.signInWithCredential(credential).then((result) => {
            const user: User = {
                id: result.uid,
                data: {phone: result.phoneNumber}
            };
            this.userSerivce.edit(user);
            this.navCtrl.navigateRoot('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    cancel(){
        this.confirmationResult = '';
        this.cdr.detectChanges();
    }

}