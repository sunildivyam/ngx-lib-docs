import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { LibInfo } from '../interfaces/docs-info.interface';
import { DocsInfoService } from '../services/docs-info.service';

export const assetInfoResolver: ResolveFn<any> = (route, state) => {
  const docsInfoService: DocsInfoService = inject(DocsInfoService);
  const libName = route.parent.params['libName'];
  const assetType = route.params['assetType'];
  const assetName = route.params['assetName'];

  const libInfo: LibInfo = docsInfoService.getLibInfo(libName);

  if (libInfo && libInfo.libAssetsInfo && libInfo.libAssetsInfo[assetType]) {
    return libInfo.libAssetsInfo[assetType].find(asset => asset.name === assetName);
  }

  return null;
};
