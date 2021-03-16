import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductToBillComponent } from './search-product-to-bill.component';

describe('SearchProductToBillComponent', () => {
  let component: SearchProductToBillComponent;
  let fixture: ComponentFixture<SearchProductToBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductToBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductToBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
