import {Injectable} from '@angular/core';
import * as data from '../../assets/cities.json';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CitiesService {


    constructor() {


    }


    getAllCities() {
        return of(data['default']);
    }

    getCitiesByRegion(region) {
        return this.getAllCities().pipe(
            map(value => {
                return value.filter((item) => {
                    return item.region === region;
                });
            }));
    }

    unique(arr) {
        const result = [];

        nextInput:
            for (let i = 0; i < arr.length; i++) {
                const str = arr[i]; // для каждого элемента
                for (let j = 0; j < result.length; j++) { // ищем, был ли он уже?
                    if (result[j] === str) {
                        continue nextInput;
                    } // если да, то следующий
                }
                result.push(str);
            }

        return result;
    }

    getRegions() {
        return this.getAllCities().pipe(
            map(value => {
                value = value.reduce((array, item) => {
                    array.push(item.region);
                    return array;
                }, []);
                return this.unique(value);

            }));

    }
}
