import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
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

  // Отправить предложение на объявление
  addResponse(idAd: string, response: ResponseModel): Promise<any> {
    response.user = this.authService.getLogin();
    response.dateCreate = new Date().toISOString();
    return this.db.object(ResponseService.typeResponses + '/' + idAd + '/'+ this.authService.getLogin()).set(response);
  }

  // получить все предложения по объявлению
  getResponse(key: string): AngularFireList<ResponseModel> {
    return this.db.list(ResponseService.typeResponses + '/' + key + '');
  }

  // мое предложение
  getMyResponse(key: string): AngularFireObject<ResponseModel> {
    return this.db.object(ResponseService.typeResponses + '/' + key + '/' + this.authService.getLogin());
  }

  // удалить предложение
  removeResponse(note: ResponseModel) {
    this.db.list(ResponseService.typeResponses).remove(note.key);
  }
}
