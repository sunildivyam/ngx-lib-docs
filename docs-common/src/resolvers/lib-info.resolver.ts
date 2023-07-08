import { ResolveFn } from '@angular/router';
import { LibInfo } from '../interfaces/docs-info.interface';
import { DocsInfoService } from '../services/docs-info.service';
import { inject } from '@angular/core';

export const libInfoResolver: ResolveFn<LibInfo> = (route, state) => {
  const docsInfoService: DocsInfoService = inject(DocsInfoService);
  const libName = route.params['libName'];
  const libInfo: LibInfo = docsInfoService.getLibInfo(libName);

  return libInfo;
};
