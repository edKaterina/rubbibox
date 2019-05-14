import { Platform } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { peopleModel } from '../../model/people-model';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.page.html',
  styleUrls: ['./people-edit.page.scss'],
})
export class PeopleEditPage implements OnInit {

  categoryList: any;
  note: peopleModel = new peopleModel;

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService,
    private masterService: MasterService,
    public platform: Platform
  ) {
    this.note.category = 'Курьер';
    this.note.user = this.authService.getLogin();
    this.categoryService.getCategoryList().valueChanges().subscribe(value => {
      this.categoryList = value.map(value1 => {
        return value1['name'];
      });
    });

    this.masterService.getPeopleDetail(this.note.user).valueChanges().subscribe(value => {
      if (value) {
        this.note = value as peopleModel;
      }
    });
  }

  ngOnInit() {
  }

  addNote(note) {
    this.masterService.addPeople(note).then(ref => {
      this.router.navigate(['/tabs/people']);
    });
  }
}
