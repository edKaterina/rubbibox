import {AfterViewInit, Component} from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
    selector: 'sms',
    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.scss'],
})
export class SmsAuthComponent implements AfterViewInit {

    public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    public phoneNumber;

    constructor(
        private fAuth: AngularFireAuth,
        private alertCtrl: AlertController,
        private navCtrl: NavController,
    ) {}

    ngAfterViewInit() {
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {'size': 'invisible'});
    }

    applyPhone() {
        const appVerifier = this.recaptchaVerifier;
        const phoneNumberString = `+${this.phoneNumber.replace(/\D+/g, "")}`;
        this.fAuth.auth.signInWithPhoneNumber(phoneNumberString, appVerifier).then(confirmationResult => {
            this.applyCode(confirmationResult);
        }).catch((error) => {
            console.log(error);
        })
    }

    async applyCode(confirmationResult) {
        const prompt = await this.alertCtrl.create({
            header: 'Введите СМС-код',
            inputs: [{name: 'confirmationCode', placeholder: 'XXXXXX',type: 'number', min: 0, max: 999999}],
            buttons: [
                {
                    text: 'Отправить',
                    handler: (data) => {
                        const credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId,data.confirmationCode);
                        this.fAuth.auth.signInWithCredential(credential).then((result)=>{
                            this.navCtrl.navigateRoot('/');
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }
            ]
        });
        await prompt.present();
    }

}