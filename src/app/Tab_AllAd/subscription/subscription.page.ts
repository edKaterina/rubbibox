import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-subscription',
  templateUrl: 'subscription.page.html',
  styleUrls: ['subscription.page.scss']
})
export class SubscriptionPage implements OnInit {
  categoryList: Observable<any[]>;
  setting: Array<string> = [];

  constructor(
    private storage: Storage,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {
    this.categoryList = this.categoryService.getCategoryList().valueChanges();
    this.categoryList.subscribe(value => {
      value.forEach(value1 => {
        this.storage.get(value1.name).then((val) => {
          if (val) {
            this.setting.push(value1.name);
          }
        });
      });
    });
  }

  ngOnInit() {
  }

  changeSubscription(event, subscription) {
    this.storage.set(subscription.name, event.detail.checked);
    this.notificationService.initPush();
  }
}
