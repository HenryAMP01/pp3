import { TestBed } from '@angular/core/testing';

import { BillProductService } from './bill-product.service';

describe('BillProductService', () => {
  let service: BillProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
