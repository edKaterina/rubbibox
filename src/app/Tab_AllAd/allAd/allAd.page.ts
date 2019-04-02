import { AdService } from './../../services/ad.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdModel } from '../../model/ad-model';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { of } from 'rxjs';

@Component({
    selector: 'app-AllAd',
    templateUrl: 'allAd.page.html',
    styleUrls: ['allAd.page.scss']
})
export class AllAdPage implements OnInit {

    //noteList: Array<AdModel> = [];
    noteList: Observable<AdModel[]>;

    categoryList: Observable<any[]>;
    private settingCategory: any = [];
    count = -1;

    trackByFn(index: number, item: AdModel) {
        return item.key;
    }

    constructor(
        private adService: AdService,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.adService.getAdSubscriptionListCache().then(value => {
            if (value) {
                this.noteList = of(value);
            }
        });
    }

    ionViewDidEnter() {
        this.categoryService.getOnCategory().subscribe(value => {
            value.then(categories => {
                let isChangeSetting = false;

                if (this.settingCategory) {
                    if (this.settingCategory.length !== categories.length) {
                        isChangeSetting = true;
                    } else {
                        if (this.settingCategory.toString() !== categories.toString()) {
                            isChangeSetting = true;
                        }
                    }
                } else {
                    isChangeSetting = true;
                }

                this.settingCategory = categories;
                if (isChangeSetting) {
                    this.adService.getAdSubscriptionList(this.settingCategory)                    
                        .subscribe(ads => {
                            this.noteList = of(ads);
                            this.count = ads.length;
                        });
                }
            });
        });
    }
}
