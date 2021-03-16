import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateOrUpdateComponent } from './category-create-or-update.component';

describe('CategoryCreateOrUpdateComponent', () => {
  let component: CategoryCreateOrUpdateComponent;
  let fixture: ComponentFixture<CategoryCreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCreateOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
