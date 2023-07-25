import { Injectable } from '@angular/core';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { ComponentProp } from '../interfaces/component-props.interface';
import { ACCESS_MODIFIERS } from '../constants/docs-common.constants';
import { ComponentInfo } from '../interfaces/component-info.interface';
import { ServiceInfo } from '../interfaces/service-info.interface';


@Injectable({
  providedIn: 'root'
})
export class DocsParserService {

  constructor(private utilsService: UtilsService) { }

  public parseProp(cmpProp: any): ComponentProp {
    return {
      name: cmpProp.name || '',
      type: cmpProp.type || '',
      defaultValue: cmpProp.defaultValue || '',
      deprecated: cmpProp.deprecated || '',
      deprecationMessage: cmpProp.deprecationMessage || '',
      description: cmpProp.description || '',
      accessModifier: cmpProp.modifierKind && ACCESS_MODIFIERS[cmpProp.modifierKind[0]] || '',
    } as ComponentProp;
  }

  public parseMethod(cmpMethod: any): ComponentProp {
    return {
      name: cmpMethod.name || '',
      returnType: cmpMethod.returnType || '',
      args: cmpMethod.args || [],
      deprecated: cmpMethod.deprecated || '',
      deprecationMessage: cmpMethod.deprecationMessage || '',
      description: cmpMethod.description || '',
      accessModifier: ACCESS_MODIFIERS[cmpMethod.modifierKind],
    } as ComponentProp;
  }

  public parseComponentInfo(rawCmpInfo: any = {}): ComponentInfo {
    return {
      name: rawCmpInfo.name || '',
      description: rawCmpInfo.description || '',
      selector: rawCmpInfo.selector || '',
      styleUrl: rawCmpInfo.styleUrlsData && rawCmpInfo.styleUrlsData[0].styleUrl || '',
      styleSource: rawCmpInfo.styleUrlsData && rawCmpInfo.styleUrlsData[0].data || '',
      templateUrl: rawCmpInfo.templateUrl && rawCmpInfo.templateUrl[0] || '',
      templateSource: rawCmpInfo.templateData || '',
      tsUrl: rawCmpInfo.file || '',
      tsSource: rawCmpInfo.sourceCode || '',
      inputProps: rawCmpInfo.inputsClass && rawCmpInfo.inputsClass.map(p => this.parseProp(p)) || [],
      outputProps: rawCmpInfo.outputsClass && rawCmpInfo.outputsClass.map(p => this.parseProp(p)) || [],
      props: rawCmpInfo.propertiesClass && rawCmpInfo.propertiesClass.map(p => this.parseProp(p)) || [],
      methods: rawCmpInfo.methodsClass && rawCmpInfo.methodsClass.map(m => this.parseMethod(m)) || [],
    } as ComponentInfo;
  }

  public parseServiceInfo(rawSvcInfo: any = {}): ServiceInfo {
    return {
      name: rawSvcInfo.name || '',
      description: rawSvcInfo.description || '',
      tsUrl: rawSvcInfo.file || '',
      tsSource: rawSvcInfo.sourceCode || '',
      inputProps: rawSvcInfo.inputsClass && rawSvcInfo.inputsClass.map(p => this.parseProp(p)) || [],
      outputProps: rawSvcInfo.outputsClass && rawSvcInfo.outputsClass.map(p => this.parseProp(p)) || [],
      props: rawSvcInfo.properties && rawSvcInfo.properties.map(p => this.parseProp(p)) || [],
      methods: rawSvcInfo.methods && rawSvcInfo.methods.map(m => this.parseMethod(m)) || [],
    } as ServiceInfo;
  }

  public parsePropValue(prop: ComponentProp, value: any): any {
    let paramValue;
    try {
      switch (prop.type) {
        case 'string':
          paramValue = value === 'null' ? null : value;
          break;
        case 'number':
          paramValue = parseInt(value);
          break;
        case 'boolean':
          paramValue = value === 'null' ? null : value === 'false' ? false : Boolean(value);
          break;
        default:
          paramValue = value === 'null' ? null : JSON.parse(value);
      }
    } catch (error: any) {
      paramValue = this.utilsService.replaceSingleWithDoubleQuotes(value);
      try {
        paramValue = paramValue === 'null' ? null : JSON.parse(paramValue);
      } catch (error: any) {
        paramValue = value;
      }
    }

    return paramValue;
  }

  public parsePropValueToStr(prop: ComponentProp, value: any): any {
    let paramValue;
    try {
      switch (prop.type) {
        case 'string':
          paramValue = value === null ? 'null' : this.utilsService.stripsOutQuotesFromStartAndEnd(value);
          break;
        case 'number':
          paramValue = value;
          break;
        case 'boolean':
          paramValue = value === 'null' ? null : value === 'false' ? false : value;
          break;
        default:
          paramValue = value === null ? 'null' : JSON.stringify(value, null, '\t');
          paramValue = this.utilsService.stripsOutQuotesFromStartAndEnd(paramValue);
      }
    } catch (error: any) {
      paramValue = value;
    }

    return paramValue;
  }

}
