import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appTextEditOnEnter]'
})
export class TextEditOnEnterDirective {

  @Output()
  onEnter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  @HostListener('keyup.enter')
  handleEnter() {
    this.onEnter.emit(this);
  }

}
