import { Pipe, PipeTransform } from '@angular/core';
import { TodoTag } from 'src/models/todo-tag';

@Pipe({
  name: 'todoIcon'
})
export class TodoIconPipe implements PipeTransform {

  /**
   * 
   * @param value A number corresponding to a tag id or array of numbers corresponding to a tag id.
   * @param tags The list of tags for lookup.
   * @returns The icon of a selected tag, or concatenation of icons for the selected tags.
   */
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
