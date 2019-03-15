import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryModel } from '../model/category-model';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public static typeCategories = 'categories';  // Категории подписок

  constructor(
    private db: AngularFireDatabase,
    private storage: Storage
  ) { }

  // Список категорий включенных в подписке
  getOnCategory() {
    return this.getCategoryList().valueChanges().pipe(map(actions => {
      const arrayResult = [];
      const arrayCategory = [];
      const arrayPromise = [];
      actions.forEach(value => {
        const category = value as CategoryModel;
        arrayPromise.push(this.storage.get(category.name));
        arrayCategory.push(category.name);
      });
      return Promise.all(arrayPromise).then(value1 => {
        value1.forEach(function (key, index) {
          if (value1[index]) {
            arrayResult.push(arrayCategory[index]);
          }
        });
        return arrayResult;
      });
    }));
  }

  // Список категорий
  getCategoryList() {
    return this.db.list(CategoryService.typeCategories);
  }
}
