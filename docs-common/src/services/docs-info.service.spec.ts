import { TestBed } from '@angular/core/testing';

import { DocsInfoService } from './docs-info.service';

describe('DocsInfoService', () => {
  let service: DocsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
