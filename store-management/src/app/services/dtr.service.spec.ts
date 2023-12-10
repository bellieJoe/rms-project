import { TestBed } from '@angular/core/testing';

import { DtrService } from './dtr.service';

describe('DtrService', () => {
  let service: DtrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
