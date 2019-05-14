import { AdService } from './../../services/ad.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdModel } from '../../model/ad-model';
import { ResponseService } from 'src/app/services/response.service';
import { of } from 'rxjs';

@Component({
    selector: 'app-myAd',
    templateUrl: 'myAd.page.html',
    styleUrls: ['myAd.page.scss']
})
export class MyAdPage implements OnInit {
    noteList: Observable<AdModel[]>;
    count = -1;

    trackByFn(index: number, item: AdModel) {
        return item.key;
    }

    constructor(
        private adService: AdService,
        private responseService: ResponseService,
    ) {
    }

    ngOnInit() {
        this.adService.getAdListUserCache().then(value => {
            this.noteList = of(value);
        });

        this.adService.getAdListUserServer()
            .subscribe(items => {
                this.count = items.length;
                this.noteList = of(items);
            });
    }

    removeAd(note) {
        this.responseService.removeResponse(note);
        this.adService.removeAd(note);
    }
}
