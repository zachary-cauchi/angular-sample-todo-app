import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTextEditMode]'
})
export class TextEditModeDirective {

  constructor(
    public tpl: TemplateRef<any>
  ) { }

}
