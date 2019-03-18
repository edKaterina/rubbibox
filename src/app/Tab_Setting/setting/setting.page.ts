import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {

  private countBadge: string;

  constructor(
    private notivicationService: NotificationService
  ) {
    this.notivicationService.getBadge().subscribe(count => {
      this.countBadge = count;
    })
  }
}
