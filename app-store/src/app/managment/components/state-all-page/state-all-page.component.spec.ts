import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAllPageComponent } from './state-all-page.component';

describe('StateAllPageComponent', () => {
  let component: StateAllPageComponent;
  let fixture: ComponentFixture<StateAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
