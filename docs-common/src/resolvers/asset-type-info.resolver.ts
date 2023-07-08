import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { LibInfo } from '../interfaces/docs-info.interface';
import { DocsInfoService } from '../services/docs-info.service';

export const assetTypeInfoResolver: ResolveFn<any> = (route, state) => {
  const docsInfoService: DocsInfoService = inject(DocsInfoService);
  const libName = route.parent.params['libName'];
  const assetType = route.params['assetType'];

  const libInfo: LibInfo = docsInfoService.getLibInfo(libName);

  if (libInfo && libInfo.libAssetsInfo) {
    return libInfo.libAssetsInfo[assetType];
  }

  return null;
};
