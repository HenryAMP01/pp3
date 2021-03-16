import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllPageComponent } from './user-all-page.component';

describe('UserAllPageComponent', () => {
  let component: UserAllPageComponent;
  let fixture: ComponentFixture<UserAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
