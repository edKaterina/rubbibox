import { Subscription } from 'rxjs';
import { AdService } from './../../services/ad.service';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdModel } from '../../model/ad-model';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnDestroy {

    id: string;
    note: AdModel = new AdModel;
    subscriptionDetail: Subscription;
    fields: any;
    isLoad: Boolean;
    isNotFound: Boolean = true;

    constructor(
        private activateRoute: ActivatedRoute,
        private adService: AdService
    ) {
        this.id = activateRoute.snapshot.params['id'];
        this.subscriptionDetail = this.adService.getAdDetail(this.id).snapshotChanges().subscribe(value => {
            this.note = value.payload.val();
            if (this.note) {
                this.fields = AdModel.getFileds(this.note.category);
                this.note.key = value.key;
                this.isNotFound = false;
            }
            this.isLoad = true;
        });
    }

    ngOnDestroy() {
        this.subscriptionDetail.unsubscribe();
    }
}

