import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRestorePasswordComponent } from './send-restore-password.component';

describe('SendRestorePasswordComponent', () => {
  let component: SendRestorePasswordComponent;
  let fixture: ComponentFixture<SendRestorePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRestorePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRestorePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
