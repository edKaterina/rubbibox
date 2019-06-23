import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';

import {first, map} from 'rxjs/operators';




@Injectable({
    providedIn: 'root'
})
export class DbService {


    constructor(
        private db: AngularFireDatabase,

    ) {
    }

    getList(path) {
        return this.db.list(path).snapshotChanges().pipe(
            first(),
            map(data =>
                data.map(a => ({data: {...a.payload.val()}, id: a.payload.key}))
            )
        );
    }


    getById(path, {id}) {
        return this.db.list(path).valueChanges().pipe(
            first(),
            map(data => ({id, data}))
        );
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
