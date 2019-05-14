import { AdService } from './../../services/ad.service';
import { Component, OnInit } from '@angular/core';
import { AdModel } from '../../model/ad-model';
import { Router } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { TypeField } from '../../model/ad-fields';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.page.html',
  styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {

  typeField = TypeField;
  categoryList: any;
  fields: any;

  constructor(
    private router: Router,
    private adService: AdService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategoryList().valueChanges().subscribe(value => {
      this.categoryList = value.map(value1 => {
        return value1['name'];
      });
    });
  }

  ngOnInit() {
  }

  changeCategory(category: string) {
    this.fields = AdModel.getFileds(category);
  }

  onSubmit(form: NgForm) {
    this.adService.addAdForFields(form.value).then(() => {
      form.reset();
    });
    this.router.navigate(['/tabs/myAd']);
  }
}
