import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { peopleModel } from '../model/people-model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public static typeMasters = 'masters';  // Мастера

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private storage: Storage
  ) { }

  // Добавить мастера
  addPeople(note: peopleModel): Promise<any> {
    note.dateCreate = new Date().toISOString();
    note.user = this.authService.getLogin();

    return this.db.object(MasterService.typeMasters + '/' + note.user).update(note);
  }

  // Список мастеров из кэша
  getPeopleListCache() {
    return this.storage.get('cache_master');
  }

  // Список мастеров
  getPeopleListServer(): Observable<any[]> {
    const list = this.db.list(MasterService.typeMasters).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val() as peopleModel;
        data.key = a.payload.key;
        return data;
      }))
    );

    list.subscribe(items => {
      this.storage.set('cache_master', items);
    });

    return list;
  }

  // информацияо мастере
  getPeopleDetail(id: string): AngularFireObject<peopleModel> {
    return this.db.object(MasterService.typeMasters + '/' + id);
  }
}
