import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CategoryModel } from '../model/category-model';
import { map } from 'rxjs/operators';
import { CategoryService } from './category.service';
import { pipe, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private db: AngularFireDatabase
  ) { }

  // создать подписку
  create(category: string) {
      this.db.object(`subscription/${this.authService.getLogin()}/${category}`).set({
        dateCreate: new Date().toISOString(),
        dateBeginPeriod: new Date().toISOString(),
        category: category
      });
  }

  // удалить подписку
  delete(category: string) {
      this.db.list(`subscription/${this.authService.getLogin()}`).remove(category);
  }

  // список категорий в подписке
  listCategory() {
    return this.db.list(`subscription/${this.authService.getLogin()}`)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          return a.payload.key;
        });
      }));
  }

  // список данных подписки
  list() {
    return this.db.list(`subscription/${this.authService.getLogin()}`)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          data['key'] = a.payload.key;
          return data;
        });
      }));
  }

  // проверка разрешения публиковать предложения, в зависимости от платности категории и ее оплаты
  isPermitResponse(category: string): Subject<any> {
    const result = new Subject();
    this.categoryService.getCategoryPrice(category).pipe(map(price => {
      if (price > 0) {
        return this.db.object(`subscription/${this.authService.getLogin()}/${category}`)
          .valueChanges().subscribe(subscriptionItem => {
            result.next((subscriptionItem['pay'] === true));
          });
      } else {
        result.next(true);
      }
    })).subscribe();
    return result;
  }
}
