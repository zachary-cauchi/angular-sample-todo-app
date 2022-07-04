import { Pipe, PipeTransform } from '@angular/core';
import { TodoTag } from 'src/models/todo-tag';

@Pipe({
  name: 'todoIcon'
})
export class TodoIconPipe implements PipeTransform {

  transform(value: number | number[], tags: TodoTag[]): string {
    if (typeof value === 'number') {
      // If the value is a number, return the icon referenced by the number id.
      return tags.find(t => value === t.id)?.icon || '';
    } else if (value instanceof Array) {
      // If value is a number array, return all the icons referenced by the array.
      return value
        .map(id => tags.find(tag => tag.id === id)?.icon || '')
        .reduce((icons, icon) => icons.concat(icon + ''), '');
    } else {
      return '';
    }
  }
}
