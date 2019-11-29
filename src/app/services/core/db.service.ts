import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';

import {first, map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DbService {


    constructor(
        private db: AngularFireDatabase,
    ) {
    }

    getList<T>(path, filter?): Observable<T[]> {
        return this.db.list(path, filter ? ref => ref.orderByChild(filter.name).equalTo(filter.value) : ref => ref).snapshotChanges().pipe(
            first(),
            map(data =>
                data.map(a => ({id: a.payload.key, data: {...a.payload.val()}} as unknown | T))
            )
        ) as Observable<T[]>;
    }

    getById<T>(path, {id}): Observable<T> {
        return this.db.object(path).valueChanges().pipe(
            first(),
            map(data => ({id, data: data[id]} as unknown | T))
        ) as Observable<T>;
    }

    valueChangesById<T>(path, {id}): Observable<T> {
        return this.db.object(path).valueChanges().pipe(
            map(data => ({id, data: data[id]} as unknown | T))
        ) as Observable<T>;
    }

    snapshotChangesList<T>(path, filter?): Observable<T[]> {
        return this.db.list(path, filter ? ref => ref.orderByChild(filter.name).equalTo(filter.value) : ref => ref).snapshotChanges().pipe(
            map(data =>
                data.map(a => ({id: a.payload.key, data: {...a.payload.val()}} as unknown | T))
            )
        ) as Observable<T[]>;
    }

    push(path, {data}) {

        const ref = this.db.list(path).push(data);

        return {id: ref.key, data};
    }

    async set(path, {id, data}) {

        await this.db.object(`${path}/${id}`).set(data);

        return {id, data};
    }

    async edit(path, {id, data}) {

        await this.db.object(`${path}/${id}`).update(data);

        return {id, data};
    }

    delete(path, {id}) {
        return this.db.object(`${path}/${id}`).remove();
    }


}
