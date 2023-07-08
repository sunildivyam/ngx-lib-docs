import { Component, Injector, Input, OnInit, Type } from '@angular/core';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { ServiceInfo, ComponentProp } from '@annuadvent/ngx-lib-docs/docs-common';
import { SERVICE_INFO_TABS } from '../../constants/service-info.constants';
import { PROPERTY_TYPES } from '@annuadvent/ngx-lib-docs/docs-common';
import { DocsParserService } from '@annuadvent/ngx-lib-docs/docs-common';


@Component({
  selector: 'anu-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {
  /**
   * Service Info, usually comes from parsed compdoc generated json.
   */
  @Input() serviceInfo: ServiceInfo;
  /**
   * Service's class
   */
  @Input() serviceType: Type<any>;

  tabs = SERVICE_INFO_TABS.map(t => ({ ...t }));
  activeTab = this.tabs[1];
  propertyTypes: typeof PROPERTY_TYPES = PROPERTY_TYPES;
  filteredMethods: Array<ComponentProp> = [];
  searchKeys = ['name', 'description'];
  serviceInstance: any;
  methodParameters: Array<any> = [];
  methodResponses: Array<string> = [];
  methodErrors: Array<any> = [];
  loading: boolean = false;
  error: any;

  constructor(private docsParserService: DocsParserService, private injector: Injector) { }

  ngOnInit(): void {
    this.initServiceInstance();
  }

  ngOnChanges(): void {
    this.initServiceInstance();
  }

  private initServiceInstance() {
    this.filteredMethods = this.serviceInfo?.methods || [];
    // Set Service Instance
    if (this.serviceInfo && this.serviceType) {
      this.serviceInstance = this.injector.get<any>(this.serviceType);
    } else {
      this.serviceInstance = null;
    }
  }


  public tabChanged(tab: Tab) {
    this.activeTab = tab;
  }

  public onMethodSearch(filteredMethods: Array<ComponentProp | Object>): void {
    this.filteredMethods = filteredMethods as Array<ComponentProp>;
  }

  public methodParametersChanged(params: Array<any>, method: ComponentProp): void {
    this.methodParameters = params;

    const argValues = params.map(p => this.docsParserService.parsePropValue(p, p.value));

    const returnOfFunction = this.serviceInstance[method.name](...argValues);
    if (method.returnType.includes('Observable')) {
      returnOfFunction.subscribe(res => {
        delete this.methodErrors[method.name];
        this.methodResponses[method.name] = JSON.stringify(res, null, '\t');
      })
        .catch(error => {
          this.methodErrors[method.name] = error;
          delete this.methodResponses[method.name];
        })
    } else if (method.returnType.includes('Promise')) {
      returnOfFunction.then(res => {
        delete this.methodErrors[method.name];
        this.methodResponses[method.name] = JSON.stringify(res, null, '\t');
      }, error => {
        this.methodErrors[method.name] = error;
        delete this.methodResponses[method.name];
      })
    } else {
      this.methodResponses[method.name] = JSON.stringify(returnOfFunction, null, '\t');
    }
  }

}
