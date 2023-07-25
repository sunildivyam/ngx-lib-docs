import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { InterceptorInfo } from '@annuadvent/ngx-lib-docs/docs-common';
import { INTERCEPTOR_INFO_TABS } from '../../constants/interceptor-info.constants';
import { PROPERTY_TYPES } from '@annuadvent/ngx-lib-docs/docs-common';


@Component({
  selector: 'anu-interceptor-info',
  templateUrl: './interceptor-info.component.html',
  styleUrls: ['./interceptor-info.component.scss']
})
export class InterceptorInfoComponent implements OnInit {
  @Input() interceptorInfo: InterceptorInfo;

  tabs = INTERCEPTOR_INFO_TABS.map(t => ({ ...t }));
  activeTab = this.tabs[0];
  propertyTypes: typeof PROPERTY_TYPES = PROPERTY_TYPES;
  loading: boolean = false;
  error: any;

  constructor() { }

  ngOnInit(): void { }

  public tabChanged(tab: Tab) {
    this.activeTab = tab;
  }

}
