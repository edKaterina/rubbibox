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

    ) {
    }

    getList(): Observable<Offer[]> {



    }

    getById(id: string) {

    }

    add() {

    }

    edit() {

    }

    delete() {

    }



}
