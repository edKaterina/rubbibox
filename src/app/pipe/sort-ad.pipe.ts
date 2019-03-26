import { Pipe, PipeTransform } from '@angular/core';
import { AdModel } from '../model/ad-model';

@Pipe({
  name: 'sortAd'
})
export class SortAdPipe implements PipeTransform {

  transform(value: Array<AdModel>, args?: any): any {
    if (value) {
      return value.sort(this.compare);
    }
  }

  compare(a: AdModel, b: AdModel) {
    if (a.dateCreate < b.dateCreate) {
      return 1;
    } else if (a.dateCreate > b.dateCreate) {
      return -1;
    }
    return 0;
  }

}
