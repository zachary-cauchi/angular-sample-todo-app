import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTextViewMode]'
})
export class TextViewModeDirective {

  constructor(
    public tpl: TemplateRef<any>
  ) { }

}
