import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterGroup'
})
export class FilterGroupPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    
    if (!searchText || searchText === '') return items;

    return items.filter(item => 
      item.ProductGroupID.indexOf(searchText) !== -1 );
    
  }
}
