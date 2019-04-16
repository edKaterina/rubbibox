import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { CategoryModel } from 'src/app/model/category-model';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-subscription',
  templateUrl: 'subscription.page.html',
  styleUrls: ['subscription.page.scss']
})
export class SubscriptionPage implements OnInit {
  categoryList: Observable<any[]>;
  setting = {};
  isLoad = false;

  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private subscriptionService: SubscriptionService,
    private alertController: AlertController
  ) {
    this.categoryList = this.categoryService.getCategoryList().valueChanges();
    this.categoryList.subscribe(categotyItems => {
      categotyItems.forEach(categoryItem => {
        this.setting[categoryItem.name] = false;
      });

      subscriptionService.listCategory()
        .subscribe(subscriptionItems => {
          subscriptionItems.forEach(subscriptionItem => {
            this.setting[subscriptionItem] = true;
          });
          this.isLoad = true;
        });
    });
  }

  ngOnInit() {
  }

  changeSubscription(event, subscription) {
    if (event.detail.checked) {
      if (subscription.price && subscription.price > 0) {
        this.permitSubscription(subscription, event);
      } else {
        this.notificationService.subscribeToTopic(subscription.name);
        this.subscriptionService.create(subscription.name);
      }
    } else {
      this.notificationService.unsubscribeFromTopic(subscription.name);
      this.subscriptionService.delete(subscription.name);
    }
  }

  async permitSubscription(subscription: CategoryModel, event) {
    const alert = await this.alertController.create({
      header: 'Подписаться на категорию',
      message: `Стоимость подписки ${subscription.price} рублей в месяц.`,
      buttons: [{
        text: 'Оплатить',
        handler: () => {
          this.notificationService.subscribeToTopic(subscription.name);
          this.subscriptionService.create(subscription.name);
        }
      }, {
        text: 'Отмена',
        role: 'cancel',
        handler: () => {
          event.srcElement.checked = false;
        }
      }]
    });

    await alert.present();
  }

}
