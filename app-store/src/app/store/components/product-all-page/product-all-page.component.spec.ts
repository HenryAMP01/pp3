import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAllPageComponent } from './product-all-page.component';

describe('ProductAllPageComponent', () => {
  let component: ProductAllPageComponent;
  let fixture: ComponentFixture<ProductAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
