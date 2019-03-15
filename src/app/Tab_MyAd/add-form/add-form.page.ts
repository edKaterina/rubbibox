import { AdService } from './../../services/ad.service';
import { CoreService } from './../../services/core.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AdModel } from '../../model/ad-model';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.page.html',
  styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {

  note: AdModel = new AdModel;
  categoryList: any;

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
        return value1['name'];
      });
    });
  }

  ngOnInit() {
  }

  addNote(note: AdModel) {
    this.authService.auth().then(value => {
      if (!note.job) {
        this.coreService.presentToast('Напишите объявление перед отправкой');
        return;
      }

      this.adService.addAd(note).then(ref => {
        this.note.job = '';
        this.router.navigate(['/tabs/myAd']);
      });
    });
  }
}
