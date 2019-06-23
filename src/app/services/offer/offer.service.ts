import {AdModel} from './../model/ad-model';
import {AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Injectable} from '@angular/core';
import {Observable, Subject, of, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {DbService} from '../core/db.service';
import {Offer} from '../../interfaces/model/offer';


@Injectable({
    providedIn: 'root'
})
export class OfferService {
    public static path = 'offers';


    constructor(
        private db: DbService
    ) {
    }

    getList(): Observable<Offer[]> {

        return this.db.getList<Offer>(OfferService.path);

    }

    getById(id: string) {
        return this.db.getById(OfferService.path, {id});
    }

    add() {

    }

    edit() {

    }

    delete() {

    }



}
