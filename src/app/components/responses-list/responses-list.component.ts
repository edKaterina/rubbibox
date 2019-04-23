import { AdService } from './../../services/ad.service';
import { CoreService } from './../../services/core.service';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { NotifyModel } from './../../model/notify-model';
import { ResponseModel } from './../../model/response-model';
import { AdModel } from '../../model/ad-model';
import { Observable, Subscription, from } from 'rxjs';
import { peopleModel } from '../../model/people-model';
import { ResponseService } from 'src/app/services/response.service';
import { MasterService } from 'src/app/services/master.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'rtp-responses-list',
  inputs: ['id'],
  templateUrl: './responses-list.component.html',
  styleUrls: ['./responses-list.component.scss']
})
export class ResponsesListComponent implements OnDestroy, OnInit {

  id: string;
  isMyAd: Boolean;
  userAd: string;

  newResponse: ResponseModel = new ResponseModel;
  myResponse: ResponseModel = new ResponseModel;

  isMyResponse: Boolean;
  isLoadResponse: Boolean;
  isPermitResponse: Boolean;

  countResponse = 0;

  isExistProfileMaster: Boolean = true;

  responseList: Observable<any[]>;

  notePeople: peopleModel = new peopleModel;
  subscription: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private coreService: CoreService,
    private adService: AdService,
    private responseService: ResponseService,
    private masterService: MasterService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private subscriptionService: SubscriptionService
  ) {
  }

  ngOnInit() {
    this.authService.auth().then(login => {
      this.adService.getAdDetail(this.id).valueChanges().subscribe(adDetail => {
        this.userAd = adDetail.user;
        if (adDetail.user === login) {
          this.isMyAd = true;
        }

        this.masterService.getPeopleDetail(this.authService.getLogin()).valueChanges().subscribe(peopleDetail => {
          if (!peopleDetail) {
            // console.log('Отсутствует профиль мастера');
            this.isExistProfileMaster = false;
          }

          if (this.isMyAd) {
            this.responseList = this.responseService.getResponse(this.id).valueChanges();
            this.subscription = this.responseList.subscribe(responseList => {
              this.isMyResponse = false;
              this.countResponse = responseList.length;
              responseList.forEach(responseDetail => {
                if (responseDetail.user === this.authService.getLogin()) {
                  this.isMyResponse = true;
                  this.myResponse = responseDetail;
                }
                this.notificationService.setMarkRead('Ad_' + this.id + '_' + responseDetail.user);
              });
              this.isLoadResponse = true;
            });
          } else {
            this.subscriptionService.isPermitResponse(adDetail.category).subscribe(result => {
              this.isPermitResponse = result;
              if (this.isPermitResponse) {
                this.responseService.getMyResponse(this.id).valueChanges().subscribe(response => {
                  if (response) {
                    this.isMyResponse = true;
                    this.myResponse = response;
                  }
                  this.isLoadResponse = true;
                });
              } else {
                this.isLoadResponse = true;
              }
            });
          }
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addResponse(idAd: string) {
    if (!this.isExistProfileMaster) {
      if (!this.notePeople.fio) {
        this.coreService.presentToast('Не заполнено Ф.И.О.');
        return;
      }
      if (!this.notePeople.phone) {
        this.coreService.presentToast('Не заполнен мобильный телефон');
        return;
      }
    }
    if (!this.newResponse.response) {
      this.coreService.presentToast('Не заполнено предложение на объявление');
      return;
    }

    this.masterService.addPeople(this.notePeople);
    this.responseService.addResponse(idAd, this.newResponse).then(value => {
      this.translateService.get('Новое предложение').subscribe(async (res: string) => {
        const notify = new NotifyModel;
        notify.subject = res;
        notify.text = this.newResponse.response;
        notify.url = '/detail/' + idAd;

        this.notificationService.updateNotify('Ad_' + this.id, this.userAd, notify);
        console.log('Отправил');
        this.newResponse.response = '';
      });
    });
  }
}
