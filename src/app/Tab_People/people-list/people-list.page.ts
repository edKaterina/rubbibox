import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { peopleModel } from '../../model/people-model';
import { map } from 'rxjs/operators';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-people',
  templateUrl: './people-list.page.html',
  styleUrls: ['./people-list.page.scss'],
})
export class PeopleListPage implements OnInit {

  peopleList: Observable<any[]>;

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.peopleList = this.masterService.getPeopleList().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        data.key = id;
        return { id, ...data };
      }))
    );
  }
}
