import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public countBadge: number;

  constructor(
    private authService: AuthService,
    private notivicationService: NotificationService
  ) {
    this.notivicationService.initNotify();
    this.notivicationService.getBadge().subscribe(count => {
      this.countBadge = count;
    });
  }
}
