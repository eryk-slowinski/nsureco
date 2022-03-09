import { Pipe, PipeTransform } from '@angular/core';
import { PolicyLinesConfig } from 'src/app/models/policyLinesConfig';

@Pipe({
  name: 'filteringPipe'
})
export class FilteringPipePipe implements PipeTransform {


  transform(arr: any[], searchTerm: string) {

    if (!arr || !searchTerm) {
      return arr;
    }

    return arr.filter(productLine =>
      productLine.version.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      productLine.id == searchTerm ||
      productLine.policyLineType.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      productLine.productId.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1

    );
  }


}
