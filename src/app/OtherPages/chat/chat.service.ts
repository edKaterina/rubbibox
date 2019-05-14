import { AuthService } from './../../services/auth.service';
import { MessageModel } from './../../model/message-model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public static typeDialogs = 'dialogs';  // Диалоги мессенджера

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
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

    return chatUser[0] + '_' + chatUser[1];
  }

  // Отправка сообщения в диалог
  sendMessage(chatID: string, message: MessageModel) {
    message.user = this.authService.getLogin();
    message.dateCreate = new Date().toISOString();
    this.db.list(ChatService.typeDialogs + '/' + chatID + '/messages').push(message);
  }

  // Список сообщений в диалоге
  getMessages(chat: string): AngularFireList<MessageModel> {
    return this.db.list(ChatService.typeDialogs + '/' + chat + '/messages');
  }
}
