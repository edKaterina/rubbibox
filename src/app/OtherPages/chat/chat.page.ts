import { AuthService } from './../../services/auth.service';
import { ChatService } from './chat.service';
import { NotifyModel } from './../../model/notify-model';
import { MessageModel } from '../../model/message-model';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
    @ViewChild('content') content: any;

    messageList: Observable<any[]>;
    nickname;
    userTo;
    messages: any;
    chatID;
    audio;

    message: MessageModel = new MessageModel;
    prevDataCreate = '2000-03-08T08:50:42.157Z';
    pipe = new DatePipe('en-US'); // Use your own locale
    subscription: Subscription;
    oldCountMessages: number;

    constructor(
        private iab: InAppBrowser,
        private activateRoute: ActivatedRoute,
        private chatService: ChatService,
        private authService: AuthService,
        private notivicationService: NotificationService,
        private translateService: TranslateService
    ) {
        this.userTo = this.activateRoute.snapshot.params['id'];

        this.authService.auth().then(login => {
            this.nickname = login;
            this.audio = new Audio();
            this.audio.src = 'assets/notify.mp3';

            this.chatID = this.chatService.getChatID(this.userTo);
        });
    }



    ionViewDidLeave() {
        this.messageList = null;
        this.subscription.unsubscribe();
    }

    ionViewDidEnter() {
        this.authService.auth().then(value => {
            this.messageList = this.chatService.getMessages(this.chatID).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const id = a.payload.key;
                    const data = a.payload.val();

                    // обработка ссылок
                    const link = data.text;
                    if (link.indexOf('http://') !== -1 || link.indexOf('https://') !== -1) {
                        data.link = link;
                    }

                    data.key = id;

                    this.notivicationService.setMarkRead('messages_' + this.userTo);

                    if (this.pipe.transform(this.prevDataCreate, 'dd.MM.y') !== this.pipe.transform(data.dateCreate, 'dd.MM.y')) {
                        const curDate = this.pipe.transform(data.dateCreate, 'dd.MM.y');
                        if (curDate === this.pipe.transform(new Date, 'dd.MM.y')) {
                            data.dateGroup = 'сегодня';
                        } else {
                            data.dateGroup = this.pipe.transform(data.dateCreate, 'dd.MM.y');
                        }
                    }

                    this.scrollNewMessage();
                    this.prevDataCreate = data.dateCreate;
                    return { id, ...data };
                }))
            );
            this.subscription = this.messageList.subscribe(messages => {
                if (this.oldCountMessages) {
                    if (this.oldCountMessages !== messages.length) {
                        this.scrollNewMessage();
                        this.audio.play();
                    }
                }
                this.oldCountMessages = messages.length;
            });
        });
    }

    sendMessage() {
        this.translateService.get('Новое сообщение').subscribe(async (res: string) => {
            const notify = new NotifyModel;
            notify.subject = res;
            notify.text = this.message.text;
            notify.url = '/chat/' + this.authService.getLogin();

            this.notivicationService.updateNotify('messages', this.userTo, notify);
            this.chatService.sendMessage(this.chatID, this.message);
            this.message.text = '';
        });
    }

    scrollNewMessage() {
        // if (this.isShown) {
        // let dimensions = this.content.getContentDimensions();
        // console.log(this.content);
        // this.content.getScrollElement().then(scrollElement => {
        //     console.log(scrollElement);

        //     console.log(scrollElement.el.scrollHeight);
        //     console.log(scrollElement.el.clientHeight);

        // });


        this.content.scrollToPoint(0, 50000, 500);
        //}
    }

    openLink(link?: string) {
        if (link) {
            const browser = this.iab.create(link);
            browser.show();
        }
    }
}
