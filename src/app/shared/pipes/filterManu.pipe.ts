import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterManu'
})
export class FilterManuPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    
    if (!searchText || searchText === '') return items;

    return items.filter(item => 
      item.ManufacturerID.indexOf(searchText) !== -1 );
    
  }
}
