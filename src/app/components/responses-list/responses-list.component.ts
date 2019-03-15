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
    private notivicationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.authService.auth().then(login => {
      this.adService.getAdDetail(this.id).valueChanges().subscribe(value => {
        const adDetail = value as AdModel;
        this.userAd = adDetail.user;
        if (adDetail.user === login) {
          this.isMyAd = true;
        }

        this.masterService.getPeopleDetail(this.authService.getLogin()).valueChanges().subscribe(value => {
          if (!value) {
            // console.log('Отсутствует профиль мастера');
            this.isExistProfileMaster = false;
          }

          this.responseList = this.responseService.getResponse(this.id).valueChanges();
          this.subscription = this.responseList.subscribe(value => {
            this.isMyResponse = false;
            this.countResponse = value.length;
            value.forEach(value1 => {
              console.log('response');
              console.log(value1);
              if (value1.user === this.authService.getLogin()) {
                this.isMyResponse = true;
                this.myResponse = value1;
              }

              console.log(this.activateRoute.snapshot.url);
              this.notivicationService.setMarkRead('Ad_' + this.id + '_' + value1.user);
            });
            this.isLoadResponse = true;
          });
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addResponse(idAd) {
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
      const notify = new NotifyModel;
      notify.subject = 'Новое предложение';
      notify.text = this.newResponse.response;
      notify.url = '/detail/' + idAd;

      this.notivicationService.updateNotify('Ad_' + this.id, this.userAd, notify);
      console.log('Отправил');
      this.newResponse.response = '';
    });
  }
}
