import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    
    if (!searchText || searchText == '') return items;

    return items.filter(item => 
      item.Title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 );
    
  }
}
