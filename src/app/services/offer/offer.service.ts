import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';


import {DbService} from '../core/db.service';
import {Offer} from '../../interfaces/model/offer';
import {AuthService} from "../auth.service";


@Injectable({
    providedIn: 'root'
})
export class OfferService {
    public static path = 'offers';


    constructor(
        private db: DbService,
        private authService: AuthService
    ) {
    }

    getList(): Observable<Offer[]> {
        return this.db.getList<Offer>(OfferService.path);
    }

    getMy(): Observable<Offer[]> {
        return this.db.snapshotChangesList<Offer>(OfferService.path,{name:'owner',value:this.authService.getLogin()});
    }

    getById(id: string): Observable<Offer> {
        return this.db.getById<Offer>(OfferService.path, {id});
    }

    add(offer: Offer) {
        this.db.push(OfferService.path, offer);
    }

    edit(offer: Offer) {
        return this.db.edit(OfferService.path,{id:offer.id,data:offer.data});
    }

    delete(offer) {
        return this.db.delete(OfferService.path, offer);
    }

    getCategoryList(): Observable<string[]> {
        return of([
            'Автомобили',
            'Недвижимость',
            'Услуги'
        ]);
    }
}
