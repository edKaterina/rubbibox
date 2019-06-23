import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';


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

    add(offer: Offer) {
        this.db.push(OfferService.path, offer);
    }

    edit() {

    }

    delete() {

    }

    getCategoryList(): Observable<string[]> {
        return of([
            'Автомобили',
            'Недвижимость',
            'Услуги'
        ]);
    }
}
