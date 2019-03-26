import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    this.masterService.getPeopleListCache().then(value => {
      this.peopleList = of(value);
    });

    this.masterService.getPeopleListServer().subscribe(value =>{
      this.peopleList = of(value);
    });
  }
}
