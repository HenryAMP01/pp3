import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAllPageComponent } from './bill-all-page.component';

describe('BillAllPageComponent', () => {
  let component: BillAllPageComponent;
  let fixture: ComponentFixture<BillAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
