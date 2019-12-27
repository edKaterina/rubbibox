import { AuthService } from '../../../services/auth.service';
import { ChatService } from './chat.service';
import { Message } from '../../../interfaces/model/message';
import {Component, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../interfaces/model/user';
import {IMAGE_SETTINGS} from '../../../config/no-image.settings';
import {ActionSheetController} from '@ionic/angular';

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
    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;
    noImageUrl = IMAGE_SETTINGS.NO_IMAGE;
    messageList: Observable<any[]>;
    nickname;
    userTo;
    messages: any;
    chatID;
    audio;
    user: Observable<User>;
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
        private userService: UserService,
        private chatService: ChatService,
        private authService: AuthService,
        private translateService: TranslateService,
        private actionSheetController: ActionSheetController,
        private router: Router
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
        this.user = this.userService.getById(this.userTo).pipe(
            map((item: User) => {
                    return item;
                }
            ));
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

    showMenu() {
        this.translateService.get(['delete_dialog', 'delete_messages', 'cancel']).subscribe(async (res: string[]) => {
            const buttons = [{
                text: res['delete_dialog'],
                handler: () => {
                    this.chatService.deleteDialog(this.userTo, this.chatID)
                    this.router.navigate(['/']);
                }
            }, {
                text: res['delete_messages'],
                handler: () => {
                    this.chatService.deleteMessages(this.chatID, this.userTo)
                    this.router.navigate(['/']);

                }
            }, {
                text: res['cancel'],
                role: 'cancel'
            }];
            this.presentActionSheet(buttons);
        });

    }
    async presentActionSheet(buttons) {
            const actionSheet = await this.actionSheetController.create({
                mode: 'ios',
                buttons
            });
            await actionSheet.present();

    }
}
