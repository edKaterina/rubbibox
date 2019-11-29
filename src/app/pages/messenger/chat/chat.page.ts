import { AuthService } from '../../../services/auth.service';
import { ChatService } from './chat.service';
import { Message } from '../../../interfaces/model/message';
import {Component, Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../interfaces/model/user';

@Pipe({
    name: 'userfioPipe'
})
export class UserFioPipe implements PipeTransform {
    constructor(private userService: UserService) {}

    transform(value: string): any {
        return this.userService.getById(value).pipe(
            map((user: User) => {
                return (user.data && user.data.fio ? user.data.fio : '');
            })
        );
    }


}


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

    message: Message = new Message;
    prevDataCreate = '2000-03-08T08:50:42.157Z';
    pipe = new DatePipe('en-US'); // Use your own locale
    subscription: Subscription;
    oldCountMessages: number;

    trackByFn(index: number, item: Message) {
        return item.key;
    }

    constructor(
        private iab: InAppBrowser,
        private activateRoute: ActivatedRoute,
        private chatService: ChatService,
        private authService: AuthService,
        private translateService: TranslateService
    ) {
        this.userTo = this.activateRoute.snapshot.params['id'];

        this.nickname = this.authService.getLogin();
        this.audio = new Audio();
        this.audio.src = 'assets/notify.mp3';

        this.chatID = this.chatService.getChatID(this.userTo);
    }



    ionViewDidLeave() {
        this.messageList = null;
        this.subscription.unsubscribe();
    }

    ionViewDidEnter() {
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

                if (this.pipe.transform(this.prevDataCreate, 'dd.MM.y') !== this.pipe.transform(data.dateCreate, 'dd.MM.y')) {
                    const curDate = this.pipe.transform(data.dateCreate, 'dd.MM.y');
                    if (curDate === this.pipe.transform(new Date, 'dd.MM.y')) {
                        data.dateGroup = 'today';
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
    }

    sendMessage() {
        if (this.message.text.trim().length == 0) {
            return;
        }

        this.translateService.get('new_message').subscribe(async (res: string) => {
            this.chatService.sendMessage(this.chatID, this.message);
            this.message.text = '';
        });
    }

    scrollNewMessage() {
        this.content.scrollToPoint(0, 50000, 500);
    }

    openLink(link?: string) {
        if (link) {
            const browser = this.iab.create(link);
            browser.show();
        }
    }
}
