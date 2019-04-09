import { Component, OnInit, AfterViewInit } from '@angular/core';
import { peopleModel } from '../../model/people-model';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-people',
  templateUrl: './people-list.page.html',
  styleUrls: ['./people-list.page.scss'],
})
export class PeopleListPage implements OnInit, AfterViewInit {

  peopleList: Array<peopleModel>;

  trackByFn(index: number, item: peopleModel) {
    return item.key;
  }

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.masterService.getPeopleListCache().then(value => {
      this.peopleList = value;
    });
  }

  ngAfterViewInit() {
    this.masterService.getPeopleListServer().subscribe(value => {
      this.peopleList = value;
    });
  }
}
