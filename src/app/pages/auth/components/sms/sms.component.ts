import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {AlertController, NavController, Platform} from '@ionic/angular';

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user/user.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
    selector: 'sms',
    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.scss'],
})
export class SmsAuthComponent implements OnInit {

    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    phoneNumber;
    code;
    confirmationResult;
    confirm = false;
    sms = false;
    isSendPhone: boolean;
    codeCity: number = 7;
    constructor(
        private fAuth: AngularFireAuth,
        private userSerivce: UserService,
        private alertCtrl: AlertController,
        private navCtrl: NavController,
        private cdr: ChangeDetectorRef,
        private authService: AuthService,
        private router: Router,
        private zone: NgZone,
        private platform: Platform
    ) {
    }

    ngOnInit() {
        this.authService.initAuthSMS(window);
    }

    isMobile() {
        return (this.platform.is('android') || this.platform.is('ios'));
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        if (!this.isSendPhone) {
            this.authService.sendPhone(this.codeCity + form.value.phone).then(result => {
                if (result) {
                    this.isSendPhone = true;
                }
            });
        } else {
            form.value.phone = this.codeCity + this.phoneNumber;
            this.authService.sendCode(form.value.code, form.value).then(user => {
                if (user) {
                    this.router.navigate(['/system/profile']);
                }
            });
        }
    }

    changePhone(form: NgForm) {
        this.isSendPhone = false;
        form.reset();
    }

    cancel() {
        this.confirm = false;
        this.sms = false;
        this.confirmationResult = '';
        this.cdr.detectChanges();
    }

}
