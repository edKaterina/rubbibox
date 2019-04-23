import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { CategoryModel } from '../model/category-model';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public static typeCategories = 'categories';  // Категории подписок

  constructor(
    private db: AngularFireDatabase,
    private storage: Storage
  ) { }

  // Список категорий
  getCategoryList(): AngularFireList<CategoryModel> {
    return this.db.list(CategoryService.typeCategories);
  }

  // стоимость подписки на катгорию
  getCategoryPrice(category: string): Observable<number> {
    return this.db.list(CategoryService.typeCategories, ref => {
      return ref.orderByChild('name').equalTo(category);
    }).snapshotChanges().pipe(
      map(actions => {
        const ar = actions.map(a => {
          const data = a.payload.val() as CategoryModel;
          return data.price;
        });
        return ar[0];
      })
    );
  }
}
