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
    isLoad: Boolean = false;

    message: MessageModel = new MessageModel;
    prevDataCreate = '2000-03-08T08:50:42.157Z';
    pipe = new DatePipe('en-US'); // Use your own locale
    subscription: Subscription;

    constructor(
        private activateRoute: ActivatedRoute,
        private chatService: ChatService,
        private authService: AuthService,
        private notivicationService: NotificationService
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
        console.log('ionViewDidLeave');
        this.messageList = null;
        this.subscription.unsubscribe();
    }

    ionViewDidEnter() {
        this.authService.auth().then(value => {
            this.messageList = this.chatService.getMessages(this.chatID).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const id = a.payload.key;
                    const data = a.payload.val();
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
                    if (this.isLoad) {
                        this.audio.play();
                    }
                    this.isLoad = true;

                    this.prevDataCreate = data.dateCreate;
                    return { id, ...data };
                }))
            );
            this.subscription = this.messageList.subscribe();
        });
    }

    sendMessage() {
        const notify = new NotifyModel;
        notify.subject = 'Новое сообщение';
        notify.text = this.message.text;
        notify.url = '/chat/' + this.authService.getLogin();

        this.notivicationService.updateNotify('messages', this.userTo, notify);
        this.chatService.sendMessage(this.chatID, this.message);
        this.message.text = '';
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
}
