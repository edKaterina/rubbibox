import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {

  public countBadge: number;
  public isShow:{};

  constructor(
    private notivicationService: NotificationService,
    private coreService: CoreService,
  ) {
    this.coreService.getSettings().subscribe((setting)=>{
      this.coreService.setCacheSettings(setting);
    });
    this.coreService.getCacheSettings().then((setting)=>{
      this.isShow = setting;
    });
    this.notivicationService.getBadge().subscribe(count => {
      this.countBadge = count;
    });
  }
}
