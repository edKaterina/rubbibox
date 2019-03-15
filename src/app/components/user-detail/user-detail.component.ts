import { Component, OnInit } from '@angular/core';
import { peopleModel } from '../../model/people-model';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'rtp-user-detail',
  inputs: ['idUser'],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  idUser: string | null = null;
  userDetail: peopleModel = new peopleModel;

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.masterService.getPeopleDetail(this.idUser).valueChanges().subscribe(value => {
      if (value){
        this.userDetail = value as peopleModel;
      }
    });
  }

}