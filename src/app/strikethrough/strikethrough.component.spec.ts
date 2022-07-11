import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikethroughComponent } from './strikethrough.component';

describe('StrikethroughComponent', () => {
  let component: TestStrikethroughComponent;
  let fixture: ComponentFixture<TestStrikethroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestStrikethroughComponent, StrikethroughComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStrikethroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should start off as unstriken when strike is left false', () => {
    expect(component).toBeDefined();

    fixture.detectChanges();
    fixture

    const elm = fixture.nativeElement;

    expect(elm).not.toHaveClass('strike');
    expect(elm).not.toHaveClass('unstrike');
  });

  it('Should strike the text if \'strike\' is set to true', () => {
    expect(component).toBeDefined();

    component.strike = true;
    fixture.detectChanges();
    
    const elm = fixture.nativeElement.querySelector('div');

    expect(elm).toHaveClass('strike');
    expect(elm).not.toHaveClass('unstrike');
  });

  it('Should not strike the text if \'strike\' is set to false', () => {
    expect(component).toBeDefined();

    component.strike = true;
    fixture.detectChanges();
    component.strike = false;
    fixture.detectChanges();
    
    const elm = fixture.nativeElement.querySelector('div');

    expect(elm).not.toHaveClass('strike');
    expect(elm).toHaveClass('unstrike');
  });
});

@Component({
  template: '<app-strikethrough [strike]="strike">Testing Strikethrough</app-strikethrough>'
})
class TestStrikethroughComponent {
  strike = false;
}
