import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreateOrUpdateComponent } from './payment-create-or-update.component';

describe('PaymentCreateOrUpdateComponent', () => {
  let component: PaymentCreateOrUpdateComponent;
  let fixture: ComponentFixture<PaymentCreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCreateOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
