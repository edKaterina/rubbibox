import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ResponseModel } from '../model/response-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  public static typeResponses = 'responses';  // Предложения на объявления

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  addResponse(idAd: string, response: ResponseModel) {
    response.user = this.authService.getLogin();
    response.dateCreate = new Date().toISOString();
    return this.db.list(ResponseService.typeResponses + '/' + idAd + '').push(response);
  }

  getResponse(key) {
    return this.db.list(ResponseService.typeResponses + '/' + key + '');
  }

  removeResponse(note) {
    return this.db.list(ResponseService.typeResponses).remove(note.key);
  }
}
