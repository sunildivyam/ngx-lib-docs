import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { assetInfoResolver } from './asset-info.resolver';

describe('assetInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => assetInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
