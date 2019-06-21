import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabsController {

    isTabsBarShow$ = new BehaviorSubject(true);

    constructor() {
    }

    showTabBar() {
        this.isTabsBarShow$.next(true);
    }

    hideTabBar() {
        this.isTabsBarShow$.next(false);
    }
}
