import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateOrUpdateComponent } from './product-create-or-update.component';

describe('ProductCreateOrUpdateComponent', () => {
  let component: ProductCreateOrUpdateComponent;
  let fixture: ComponentFixture<ProductCreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCreateOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
