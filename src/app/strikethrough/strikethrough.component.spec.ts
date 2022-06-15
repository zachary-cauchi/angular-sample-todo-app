import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikethroughComponent } from './strikethrough.component';

describe('StrikethroughComponent', () => {
  let component: StrikethroughComponent;
  let fixture: ComponentFixture<StrikethroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrikethroughComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrikethroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
