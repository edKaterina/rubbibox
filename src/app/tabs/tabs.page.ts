import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private authService: AuthService,
    private notivicationService: NotificationService
  ) {
    this.notivicationService.initNotify();
  }

  getBadge() {
    return this.notivicationService.getBadge();
  }
}
