import { TestBed } from '@angular/core/testing';

import { DocsParserService } from './docs-parser.service';

describe('DocsParserService', () => {
  let service: DocsParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocsParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
