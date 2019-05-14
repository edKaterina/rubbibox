import { NotifyModel } from './../../model/notify-model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  list: Observable<NotifyModel[]>;
  count = -1;
  subscription: Subscription;

  constructor(
    private notivicationService: NotificationService
  ) { }

  ionViewDidLeave() {
    this.list = null;
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.list = this.notivicationService.getNotify()
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const id = a.payload.key;
          const data = a.payload.val();
          data.key = id;
          return { id, ...data };
        }))
      );

    this.subscription = this.list.subscribe(value2 => {
      this.count = value2.length;
    });
  }

}
