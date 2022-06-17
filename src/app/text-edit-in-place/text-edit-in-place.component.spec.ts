import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditInPlaceComponent } from './text-edit-in-place.component';

describe('TextEditInPlaceComponent', () => {
  let component: TextEditInPlaceComponent;
  let fixture: ComponentFixture<TextEditInPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextEditInPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextEditInPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
