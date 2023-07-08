import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { libInfoResolver } from './lib-info.resolver';

describe('libInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => libInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
