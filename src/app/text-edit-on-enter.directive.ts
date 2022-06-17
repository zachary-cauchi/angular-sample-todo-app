import { Directive, HostListener } from '@angular/core';
import { TextEditInPlaceComponent } from './text-edit-in-place/text-edit-in-place.component';

@Directive({
  selector: '[appTextEditOnEnter]'
})
export class TextEditOnEnterDirective {

  constructor(
    private editable: TextEditInPlaceComponent
  ) { }

  @HostListener('keyup.enter')
  onEnter() {
    this.editable.toViewMode();
  }

}
