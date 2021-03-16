import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAllPageComponent } from './category-all-page.component';

describe('CategoryAllPageComponent', () => {
  let component: CategoryAllPageComponent;
  let fixture: ComponentFixture<CategoryAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
