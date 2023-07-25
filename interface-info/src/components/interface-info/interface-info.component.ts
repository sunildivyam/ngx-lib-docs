import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { InterfaceInfo } from '@annuadvent/ngx-lib-docs/docs-common';
import { INTERFACE_INFO_TABS } from '../../constants/interface-info.constants';
import { PROPERTY_TYPES } from '@annuadvent/ngx-lib-docs/docs-common';

@Component({
  selector: 'anu-interface-info',
  templateUrl: './interface-info.component.html',
  styleUrls: ['./interface-info.component.scss']
})
export class InterfaceInfoComponent implements OnInit {
  @Input() interfaceInfo: InterfaceInfo;

  tabs = INTERFACE_INFO_TABS.map(t => ({ ...t }));
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
