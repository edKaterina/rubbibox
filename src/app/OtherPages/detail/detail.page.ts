import { AdService } from './../../services/ad.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdModel } from '../../model/ad-model';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage {

    id: string;
    note: AdModel = new AdModel;

    constructor(
        private activateRoute: ActivatedRoute,
        private authService: AuthService,
        private adService: AdService
    ) {
        this.id = activateRoute.snapshot.params['id'];
        this.authService.auth().then(value => {
            this.adService.getAdDetail(this.id).snapshotChanges().subscribe(value => {
                this.note = value.payload.val() as AdModel;
                this.note.key = value.key;
            });
        });
    }
}
