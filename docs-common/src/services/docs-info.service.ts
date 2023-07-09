import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { LibAssetsInfo, LibInfo, LibsInfo } from '../interfaces/docs-info.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LibAssetTypeEnums } from '../enums/docs-info.enums';
import { DocsParserService } from './docs-parser.service';
import { ComponentInfo } from '../interfaces/component-info.interface';
import { ServiceInfo } from '../interfaces/service-info.interface';
import { InterfaceInfo } from '../interfaces/interface-info.interface';
import { DirectiveInfo } from '../interfaces/directive-info.interface';
import { ClassInfo } from '../interfaces/class-info.interface';
import { InterceptorInfo } from '../interfaces/interceptor-info.interface';
import { GuardInfo } from '../interfaces/guard-info.interface';

@Injectable({
  providedIn: 'root'
})
export class DocsInfoService {
  private libsInfo$ = new BehaviorSubject<LibsInfo>({});

  constructor(
    private httpClient: HttpClient,
    private docsParserService: DocsParserService,
  ) { }


  public get libsInfo(): Observable<LibsInfo> {
    return this.libsInfo$.asObservable();
  }


  public get libsInfoValue(): LibsInfo {
    return this.libsInfo$.value;
  }

  public set libsInfoValue(value: LibsInfo) {
    this.libsInfo$.next(value);
  }

  public addLibInfo(libInfo: LibInfo): void {
    this.libsInfo$.next({ ...this.libsInfo$.value, [libInfo.name]: libInfo });
  }

  public async getLibAssetsInfo(libName: string, url: string): Promise<LibAssetsInfo> {
    if (!url) throw new Error(`Invalid lib's documentation.json url`);

    return new Promise((resolve, reject) => {
      if (this.libsInfoValue[libName]?.libAssetsInfo) {
        resolve(this.libsInfoValue[libName]?.libAssetsInfo);
      } else {
        this.httpClient.get<any>(url, { responseType: 'json' })
          .pipe(catchError(
            (errorResponse: any) => {
              let errorMsg: string;
              if (errorResponse.error instanceof HttpErrorResponse) {
                errorMsg = errorResponse.error.message;
              } else {
                errorMsg = errorResponse.message
              }
              const error = { code: errorResponse.status || errorResponse?.error?.code || errorResponse?.code || 'UNKNOWN', message: errorMsg || 'Something went wrong' }
              reject(error);

              return throwError(() => {
                return error;
              });
            }
          ))
          .subscribe(docsResponse => {
            const interceptors = [].concat(
              docsResponse.injectables.filter(inj => inj.file.includes('.interceptor.')) || [],
              docsResponse.interceptors || []
            );

            const guards = [].concat(
              docsResponse.injectables.filter(inj => inj.file.includes('.guard.')) || [],
              docsResponse.guards || []
            );

            const services = docsResponse.injectables.filter(
              inj => !inj.file.includes('.guard.') && !inj.file.includes('.guard.')
            ) || []


            const libAssetsInfo: LibAssetsInfo = {
              services: services.map(service => this.docsParserService.parseServiceInfo(service)) || [],
              components: docsResponse.components.map(component => this.docsParserService.parseComponentInfo(component)) || [],
              interfaces: docsResponse.interfaces.map(intf => this.docsParserService.parseServiceInfo(intf)) || [],
              classes: docsResponse.classes.map(cls => this.docsParserService.parseServiceInfo(cls)) || [],
              directives: docsResponse.directives.map(dirtve => this.docsParserService.parseComponentInfo(dirtve)) || [],
              interceptors: interceptors.map(interceptor => this.docsParserService.parseServiceInfo(interceptor)) || [],
              guards: guards.map(guard => this.docsParserService.parseServiceInfo(guard)) || [],
            };

            resolve(libAssetsInfo);
          })
      }
    })
  }

  public async getLibsInfo(url: string): Promise<LibsInfo> {
    if (!url) throw new Error(`Invalid lib's documentation.json url`);
    console.log(url);
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(url, { responseType: 'json' })
        .pipe(catchError(
          (errorResponse: any) => {
            let errorMsg: string;
            if (errorResponse.error instanceof HttpErrorResponse) {
              errorMsg = errorResponse.error.message;
            } else {
              errorMsg = errorResponse.message
            }
            console.log(errorResponse);
            const error = { code: errorResponse.status || errorResponse?.error?.code || errorResponse?.code || 'UNKNOWN', message: errorMsg || 'Something went wrong' }
            reject(error);

            return throwError(() => {
              return error;
            });
          }
        ))
        .subscribe((libsInfo: LibsInfo) => {
          resolve(libsInfo);
        });
    })
  }

  public getLibAssetInfo(
    libName: string,
    name: string,
    type: LibAssetTypeEnums):
    ComponentInfo | ServiceInfo | InterfaceInfo | DirectiveInfo | ClassInfo | InterceptorInfo | GuardInfo {
    let assetInfo: ComponentInfo | ServiceInfo | InterfaceInfo | DirectiveInfo | ClassInfo | InterceptorInfo | GuardInfo = null;

    if (!libName || !name) {
      throw new Error('Library Name and Component Name are required.');
    }

    const libInfo = this.libsInfoValue[libName];
    if (!libInfo) {
      throw new Error(`Library ${libName} info is not added yet. Please add using addLibInfo()`);
    }

    if (libInfo?.libAssetsInfo[type]?.length) {
      assetInfo = libInfo?.libAssetsInfo[type]?.find(c => c.name === name);
    }

    return assetInfo;
  }

  public getLibInfo(libName: string): LibInfo {

    if (!libName) {
      throw new Error('Library Name is required.');
    }

    const libInfo = this.libsInfoValue[libName];

    return libInfo;
  }

}
