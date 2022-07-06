import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextEditOnEnterDirective } from './text-edit-on-enter.directive';

@Component({
  template: `
    <input #editable appTextEditOnEnter (onEnter)="onEnterSpy()" />
  `
})
class TestComponent {
  onEnterSpy = jasmine.createSpy('onEnter');
}

describe('TextEditOnEnterDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let enterable: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TextEditOnEnterDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();

    enterable = fixture.debugElement.query(By.directive(TextEditOnEnterDirective));
  });

  it('should initialise the component with directives', () => {
    expect(fixture).toBeTruthy();
    expect(enterable).toBeTruthy();
  });

  it('should should emit an \'onEnter\' event once enter is pressed', () => {
    const textField = enterable.nativeElement as HTMLInputElement;

    textField.dispatchEvent(new KeyboardEvent('keyup', {
      bubbles: true, cancelable: true, shiftKey: false, key: 'enter', 
    }));

    expect(fixture.componentInstance.onEnterSpy).toHaveBeenCalled();
  });
});
