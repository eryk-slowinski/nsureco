import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {
  //adding Array<string> as an argument of a function prevents us from listing arguments one by one in function's body
  transform(value: Array<string>, args: any[]): any {
    const sortField = args[0];

    value.sort((a: any, b: any) => {
      if (a[sortField] > b[sortField]) {
        return -1;
      } else if (a[sortField] < b[sortField]) {
        return 1;
      } else { return 0; }
    }
    );

    return value;
  }

}
