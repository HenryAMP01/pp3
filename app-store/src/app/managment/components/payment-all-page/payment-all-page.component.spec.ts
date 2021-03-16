import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAllPageComponent } from './payment-all-page.component';

describe('PaymentAllPageComponent', () => {
  let component: PaymentAllPageComponent;
  let fixture: ComponentFixture<PaymentAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
