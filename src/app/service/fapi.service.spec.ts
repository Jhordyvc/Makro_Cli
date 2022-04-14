import { TestBed } from '@angular/core/testing';

import { FapiService } from './fapi.service';

describe('FapiService', () => {
  let service: FapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
