import { Component, OnInit } from '@angular/core';
import { peopleModel } from '../../model/people-model';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.page.html',
  styleUrls: ['./people-detail.page.scss'],
})
export class PeopleDetailPage implements OnInit {

  note: peopleModel = new peopleModel;

  constructor(
    private activateRoute: ActivatedRoute,
    private masterService: MasterService
  ) {
    this.masterService.getPeopleDetail(this.activateRoute.snapshot.params['id']).snapshotChanges().subscribe(value => {
      this.note = value.payload.val() as peopleModel;
      this.note.key = value.key;
    });
  }

  ngOnInit() {

  }

}
