import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCreateOrUpdateComponent } from './state-create-or-update.component';

describe('StateCreateOrUpdateComponent', () => {
  let component: StateCreateOrUpdateComponent;
  let fixture: ComponentFixture<StateCreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateCreateOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
