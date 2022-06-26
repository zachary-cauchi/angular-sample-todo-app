import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextEditOnEnterDirective } from './text-edit-on-enter.directive';

@Component({
  template: `
    <input #editable appTextEditOnEnter (onEnter)="encounterable.value = ''" />
    <input #noneditable />
  `
})
class TestComponent { }

describe('TextEditOnEnterDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let enterable: any;
  let nonEnterable: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TextEditOnEnterDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();

    enterable = fixture.debugElement.query(By.directive(TextEditOnEnterDirective));
    nonEnterable = fixture.debugElement.query(By.css('input:not([appTextEditOnEnter])'));
  });

  it('should initialise the component with directives', () => {
    expect(fixture).toBeTruthy();
    expect(enterable).toBeTruthy();
    expect(nonEnterable).toBeTruthy();
  });

  it('should clear the text field when onEnter emits', () => {
    const directive = enterable.injector.get(TextEditOnEnterDirective) as TextEditOnEnterDirective;
    const textField = enterable.nativeElement as HTMLInputElement;

    textField.value = 'Clear me!';
    textField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(textField.value)
      .withContext('initial value')
      .toBe('Clear me!');

    textField.dispatchEvent(new KeyboardEvent('keyup', {
      bubbles: true, cancelable: true, shiftKey: false, key: 'enter', 
    }));

    expect(textField.value)
      .withContext('changed value')
      .toBe('');
  });
});
