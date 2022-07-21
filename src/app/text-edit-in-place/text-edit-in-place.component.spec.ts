import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TextEditModeDirective } from '../text-edit-mode.directive';
import { TextEditOnEnterDirective } from '../text-edit-on-enter.directive';
import { TextViewModeDirective } from '../text-view-mode.directive';

import { TextEditInPlaceComponent } from './text-edit-in-place.component';

@Component({
  template: `
    <app-text-edit-in-place class="edit-in-place" [readOnly]="readOnly" (update)="updateCalledSpy()">
      <ng-template appTextViewMode>
          <span class="view" >{{textField}}</span>
      </ng-template>
      <ng-template appTextEditMode>
          <input type="text" class="edit" [(ngModel)]="textField"/>
      </ng-template>
    </app-text-edit-in-place>
    <div class="other-elm"></div>
  `
})
class TestTextEditInPlaceComponent {
  readOnly = true;
  textField = '';

  @ViewChild('.edit-in-place')
  subComponent!: TemplateRef<TextEditInPlaceComponent>;

  updateCalledSpy = jasmine.createSpy('enterPressed');
}

describe('TextEditInPlaceComponent', () => {
  let component: TestTextEditInPlaceComponent;
  let fixture: ComponentFixture<TestTextEditInPlaceComponent>;
  let enterable: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTextEditInPlaceComponent, TextEditInPlaceComponent, TextEditOnEnterDirective, TextEditModeDirective, TextViewModeDirective ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTextEditInPlaceComponent);
    component = fixture.componentInstance;
    enterable = fixture.debugElement.query(By.directive(TextEditOnEnterDirective));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be in view mode if doubleclicked while \'readOnly\' is set to true', () => {
    component.readOnly = true;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('span');

    dispatchDblclickEvent(element);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
  });

  it('Should be in edit mode if doubleclicked while \'readOnly\' is set to false', () => {
    component.readOnly = false;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.view');

    dispatchDblclickEvent(element);    
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.edit')).toBeTruthy();
  });

  describe('Pressing Enter', () => {
    it('Should emit its \'update\' event when pressing enter in edit mode', () => {
      component.readOnly = false;
      fixture.detectChanges();
  
      dispatchDblclickEvent(fixture.nativeElement.querySelector('.view'));
      fixture.detectChanges();
  
      expect(fixture.nativeElement.querySelector('.edit'))
        .withContext('Edit mode element should be visible')
        .toBeTruthy();
  
      fixture.detectChanges();
  
      dispatchEnterEvent(enterable.nativeElement);
  
      expect(component.updateCalledSpy).toHaveBeenCalled();
    });
  
    it('Should go back to view mode when pressing enter in edit mode', () => {
      component.readOnly = false;
      fixture.detectChanges();
  
      dispatchDblclickEvent(fixture.nativeElement.querySelector('.view'));
      fixture.detectChanges();
  
      expect(fixture.nativeElement.querySelector('.edit'))
        .withContext('Edit mode element should be visible')
        .toBeTruthy();
  
      fixture.detectChanges();
  
      dispatchEnterEvent(enterable.nativeElement);
  
      fixture.detectChanges();
  
      expect(fixture.nativeElement.querySelector('.view'))
        .withContext('View mode element should be visible')
        .toBeTruthy();
    });
  });

  describe('Defocus', () => {
    it('Should emit its \'update\' event when pressing enter in edit mode', () => {
      component.readOnly = false;
      fixture.detectChanges();
  
      dispatchDblclickEvent(fixture.nativeElement.querySelector('.view'));
      fixture.detectChanges();
  
      expect(fixture.nativeElement.querySelector('.edit'))
        .withContext('Edit mode element should be visible')
        .toBeTruthy();
  
      fixture.detectChanges();
  
      dispatchClickEvent(fixture.nativeElement.querySelector('.other-elm'));
  
      expect(component.updateCalledSpy).toHaveBeenCalled();
    });
  
    it('Should go back to view mode when pressing enter in edit mode', () => {
      component.readOnly = false;
      fixture.detectChanges();
  
      dispatchDblclickEvent(fixture.nativeElement.querySelector('.view'));
      fixture.detectChanges();
  
      expect(fixture.nativeElement.querySelector('.edit'))
        .withContext('Edit mode element should be visible')
        .toBeTruthy();
  
      fixture.detectChanges();
  
      dispatchClickEvent(fixture.nativeElement.querySelector('.other-elm'));
  
      fixture.detectChanges();
  
      expect(fixture.nativeElement.querySelector('.view'))
        .withContext('View mode element should be visible')
        .toBeTruthy();
    });
  });
});

function dispatchDblclickEvent(elm: EventTarget) {
  return elm.dispatchEvent(new MouseEvent('dblclick', {
    view: window,
    bubbles: true,
    cancelable: true
  }));
}

function dispatchClickEvent(elm: EventTarget) {
  return elm.dispatchEvent(new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  }));
}

function dispatchEnterEvent(elm: EventTarget) {
  return elm.dispatchEvent(new KeyboardEvent('keyup', {
    bubbles: true, cancelable: true, shiftKey: false, key: 'enter', 
  }));
}
