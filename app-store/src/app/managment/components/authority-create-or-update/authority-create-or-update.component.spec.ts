import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityCreateOrUpdateComponent } from './authority-create-or-update.component';

describe('AuthorityCreateOrUpdateComponent', () => {
  let component: AuthorityCreateOrUpdateComponent;
  let fixture: ComponentFixture<AuthorityCreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorityCreateOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
