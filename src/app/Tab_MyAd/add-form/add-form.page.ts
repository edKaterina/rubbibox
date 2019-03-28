import { AdService } from './../../services/ad.service';
import { CoreService } from './../../services/core.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AdModel } from '../../model/ad-model';
import { Router } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { TypeField } from '../../model/ad-fields';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.page.html',
  styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {

  typeField = TypeField;
  note: AdModel = new AdModel;
  categoryList: any;
  fields: any;

  constructor(
      private router: Router,
      private authService: AuthService,
      private coreService: CoreService,
      private adService: AdService,
      private categoryService: CategoryService
  ) {
    this.categoryService.getCategoryList().valueChanges().subscribe(value => {
      this.categoryList = value.map(value1 => {
        this.note.category = value1['name'];
        this.fields = AdModel.getFileds(this.note.category);
        return value1['name'];
      });
    });
  }

  ngOnInit() {
  }

  changeCategory() {
    this.fields = AdModel.getFileds(this.note.category);
  }

  addAdForFields() {
    const values = {};

    let isValidRequired = true;
    this.fields.forEach(field => {
      let value = (document.getElementById(field.name) as HTMLInputElement).value;
      values[field.name] = value;

      if (field.required && !value) {
        this.coreService.presentToast('Не заполнено поле: ' + field.label);
        isValidRequired = false;
        return;
      }
    });

    if (isValidRequired) {
      this.authService.auth().then(value => {
        values['category'] = this.note.category;
        this.adService.addAdForFields(values).then(() => {
          this.fields.forEach(field => {
            (document.getElementById(field.name) as HTMLInputElement).value = '';
          });
        });
        this.router.navigate(['/tabs/myAd']);
      });
    }
  }
}
