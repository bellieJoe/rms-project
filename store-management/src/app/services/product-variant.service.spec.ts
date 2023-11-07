import { TestBed } from '@angular/core/testing';

import { ProductVariantService } from './product-variant.service';

describe('ProductVariantService', () => {
  let service: ProductVariantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVariantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
