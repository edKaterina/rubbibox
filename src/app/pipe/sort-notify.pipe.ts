import { Pipe, PipeTransform } from '@angular/core';
import { NotifyModel } from '../model/notify-model';

@Pipe({
  name: 'sortNotify'
})
export class SortNotifyPipe implements PipeTransform {

  transform(value: Array<NotifyModel>, args?: any): any {
    if (value) {
      return value.sort(this.compare);
    }
  }

  compare(a: NotifyModel, b: NotifyModel) {
    if (a.dateCreate < b.dateCreate) {
      return 1;
    } else if (a.dateCreate > b.dateCreate) {
      return -1;
    }
    return 0;
  }
}
