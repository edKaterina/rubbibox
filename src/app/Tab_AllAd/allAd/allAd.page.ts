import { AdService } from './../../services/ad.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdModel } from '../../model/ad-model';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { of } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-AllAd',
    templateUrl: 'allAd.page.html',
    styleUrls: ['allAd.page.scss']
})
export class AllAdPage implements OnInit {

    noteList: Observable<AdModel[]>;
    count = -1;

    trackByFn(index: number, item: AdModel) {
        return item.key;
    }

    constructor(
        private adService: AdService,
        private categoryService: CategoryService,
        private subscriptionService: SubscriptionService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.adService.getAdSubscriptionListCache().then(value => {
            if (value) {
                this.noteList = of(value);
                this.count = value.length;
            }
        });

        this.authService.state.subscribe(authData => {
            this.subscriptionService.listCategory().subscribe(subscriptionItems => {
                this.adService.getAdSubscriptionList(subscriptionItems)
                    .subscribe(ads => {
                        this.noteList = of(ads);
                        this.count = ads.length;
                    });
            });
        });
    }
}
