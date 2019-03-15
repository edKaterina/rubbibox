import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { peopleModel } from '../model/people-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public static typeMasters = 'masters';  // Мастера

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  // Добавить мастера
  addPeople(note: peopleModel) {
    note.dateCreate = new Date().toISOString();
    note.user = this.authService.getLogin();

    return this.db.object(MasterService.typeMasters + '/' + note.user).update(note);
  }

  // Список мастеров
  getPeopleList() {
    return this.db.list(MasterService.typeMasters);
  }

  // информацияо мастере
  getPeopleDetail(id: string) {
    return this.db.object(MasterService.typeMasters + '/' + id);
  }
}
