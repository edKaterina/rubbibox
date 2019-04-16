import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
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
}
