import { AuthService } from '../../../services/auth.service';
import { Message } from '../../../interfaces/model/message';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {DialogsService} from "../dialogs/dialogs.service";
import {Dialog} from "../../../interfaces/model/dialog";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public static typeDialogs = 'dialogs';  // Диалоги мессенджера

  toUser: string;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private dialogService: DialogsService
  ) { }

  // индентификатор диалога между двумя пользователями
  getChatID(to: string): string {
    const chatUser = [];
    chatUser.push(to);
    chatUser.push(this.authService.getLogin());

    chatUser.sort((a: string, b: string) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });

    this.toUser = to;

    return chatUser[0] + '_' + chatUser[1];
  }

  // Отправка сообщения в диалог
  sendMessage(chatID: string, message: Message) {
    message.user = this.authService.getLogin();
    message.dateCreate = new Date().toISOString();

    const dialog:Dialog = {
        user: this.toUser,
        dateCreate:message.dateCreate,
        message:message.text
    };

    this.dialogService.add(this.authService.getLogin(),this.toUser,dialog);
    this.db.list(ChatService.typeDialogs + '/' + chatID + '/messages').push(message);
  }

  // Список сообщений в диалоге
  getMessages(chat: string): AngularFireList<Message> {
    return this.db.list(ChatService.typeDialogs + '/' + chat + '/messages');
  }
}
