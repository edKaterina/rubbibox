import { AdService } from './../../services/ad.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdModel } from '../../model/ad-model';
import { map } from 'rxjs/operators';
import { ResponseService } from 'src/app/services/response.service';

@Component({
    selector: 'app-myAd',
    templateUrl: 'myAd.page.html',
    styleUrls: ['myAd.page.scss']
})
export class MyAdPage implements OnInit {
    noteList: Observable<AdModel[]>;
    count = -1;

    constructor(
        private authService: AuthService,
        private adService: AdService,
        private responseService: ResponseService
    ) {
    }

    ngOnInit() {
        this.authService.auth().then(login => {
            this.noteList = this.adService.getAdListUser(login)
                .snapshotChanges().pipe(
                    map(actions => actions.map(a => {
                        const id = a.payload.key;
                        const data = a.payload.val() as AdModel;
                        data.key = id;
                        return { id, ...data };
                    }))
                );

            this.noteList.subscribe(value2 => {
                this.count = value2.length;
            });
        });
    }

    removeAd(note) {
        this.responseService.removeResponse(note);
        this.adService.removeAd(note);
    }
}
