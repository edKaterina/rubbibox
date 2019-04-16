import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CategoryModel } from '../model/category-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
  ) { }

  // создать подписку
  create(category: string) {
    this.authService.state.subscribe(authData => {
      this.db.object(`subscription/${authData.uid}/${category}`).set({
        dateCreate: new Date().toISOString(),
        dateBeginPeriod: new Date().toISOString()
      });
    });
  }

  // удалить подписку
  delete(category: string) {
    this.authService.state.subscribe(authData => {
      this.db.list(`subscription/${authData.uid}`).remove(category);
    });
  }

  listCategory() {
    return this.db.list(`subscription/${this.authService.getLogin()}`)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          return a.payload.key;
        });
      }));
  }
}
