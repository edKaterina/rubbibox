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

    noteList: Array<AdModel> = [];

    categoryList: Observable<any[]>;
    private settingCategory: any = [];

    constructor(
        private adService: AdService,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.adService.getAdSubscriptionListCache().then(value => {
            this.noteList = value;
        });
    }

    ionViewDidEnter() {
        this.categoryService.getOnCategory().subscribe(value => {
            value.then(value1 => {
                let isChangeSetting = false;

                if (this.settingCategory) {
                    if (this.settingCategory.length !== value1.length) {
                        isChangeSetting = true;
                    } else {
                        if (this.settingCategory.toString() !== value1.toString()) {
                            console.log(value1.toString());
                            isChangeSetting = true;
                        }
                    }
                } else {
                    isChangeSetting = true;
                }

                this.settingCategory = value1;
                if (isChangeSetting) {
                    this.adService.getAdSubscriptionList(this.settingCategory)
                        .subscribe(value10 => {
                            this.noteList = value10;
                        });
                }
            });
        });
    }
}
