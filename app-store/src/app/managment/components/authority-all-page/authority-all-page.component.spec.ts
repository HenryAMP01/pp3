import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityAllPageComponent } from './authority-all-page.component';

describe('AuthorityAllPageComponent', () => {
  let component: AuthorityAllPageComponent;
  let fixture: ComponentFixture<AuthorityAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorityAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
