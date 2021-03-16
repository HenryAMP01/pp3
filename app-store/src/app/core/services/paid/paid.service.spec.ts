import { TestBed } from '@angular/core/testing';

import { PaidService } from './paid.service';

describe('PaidService', () => {
  let service: PaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
