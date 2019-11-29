import {Component, Pipe, PipeTransform} from '@angular/core';
import {Router} from '@angular/router';
import {DialogsService} from './dialogs.service';
import {IMAGE_SETTINGS} from '../../../config/no-image.settings';
import {Dialog} from '../../../interfaces/model/dialog';
import {Observable} from 'rxjs';

@Pipe({
    name: 'sortDialogs'
})
export class SortDialogsPipe implements PipeTransform {
    transform(value: Array<Dialog>, args?: any): any {
        if (value) {
            return value.sort(this.compare);
        }
    }
    compare(a: Dialog, b: Dialog) {
        if (a.dateCreate < b.dateCreate) { return 1; }
        else if (a.dateCreate > b.dateCreate) { return -1; }
        return 0;
    }
}

@Component({
    selector: 'app-dialogs',
    templateUrl: './dialogs.page.html',
    styleUrls: ['./dialogs.page.scss'],
})
export class DialogsPage {

    noUserImageUrl = IMAGE_SETTINGS.NO_USER_IMAGE;

    dialogs$: Observable<Dialog[]>;

    constructor(public router: Router, private dialogsService: DialogsService) { }

    trackByFn(index: number, item) {
        return item.key;
    }

    ngOnInit() {
        this.dialogs$ = this.dialogsService.get();
    }

}
