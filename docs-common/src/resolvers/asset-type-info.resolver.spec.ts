import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { assetTypeInfoResolver } from './asset-type-info.resolver';

describe('assetTypeInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => assetTypeInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
