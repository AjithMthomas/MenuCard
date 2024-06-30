import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, fieldName: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      if (fieldName && item[fieldName]) {
        return item[fieldName].toString().toLowerCase().includes(searchText);
      }
      return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(searchText));
    });
  }

}
