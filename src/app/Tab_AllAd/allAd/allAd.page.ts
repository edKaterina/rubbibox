import { AdService } from './../../services/ad.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdModel } from '../../model/ad-model';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-AllAd',
    templateUrl: 'allAd.page.html',
    styleUrls: ['allAd.page.scss']
})
export class AllAdPage implements OnInit {

    noteList3: any = [];
    categoryList: Observable<any[]>;
    private settingCategory: any = [];

    constructor(
        private adService: AdService,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
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
                    this.noteList3 = [];
                    this.settingCategory.forEach(element => {
                        const list: Observable<AdModel[]> = this.adService.getAdList(element as string)
                            .snapshotChanges().pipe(map(actions => {
                                let category = element; // на случай если не будет элементов в катгории

                                if (actions[0]) {
                                    const data = actions[0].payload.val() as AdModel;
                                    category = data.category;
                                }

                                this.noteList3 = this.noteList3.filter((item) => {
                                    return (item as AdModel).category !== category;
                                });

                                return actions.map(a => {
                                    const data2 = a.payload.val() as AdModel;
                                    const id = a.payload.key;
                                    data2.key = id;
                                    this.noteList3.push({ id, ...data2 });
                                    return { id, ...data2 };
                                });
                            }));

                        list.subscribe(value2 => {
                            this.noteList3.sort((a: AdModel, b: AdModel) => {
                                if (a.dateCreate < b.dateCreate) {
                                    return 1;
                                } else if (a.dateCreate > b.dateCreate) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            });
                        });
                    });
                }
            });
        });
    }
}
