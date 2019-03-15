import { AuthService } from './../../services/auth.service';
import { MessageModel } from './../../model/message-model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public static typeDialogs = 'dialogs';  // Диалоги мессенджера

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  getChatID(to: string) {
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

  sendMessage(chatID: string, message: MessageModel) {
    message.user = this.authService.getLogin();
    message.dateCreate = new Date().toISOString();
    return this.db.list(ChatService.typeDialogs + '/' + chatID + '/messages').push(message);
  }

  getMessages(chat) {
    return this.db.list(ChatService.typeDialogs + '/' + chat + '/messages');
  }
}
