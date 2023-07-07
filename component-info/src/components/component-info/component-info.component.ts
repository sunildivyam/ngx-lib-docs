import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { ComponentInfo } from '@annuadvent/ngx-lib-docs/docs-common';
import { COMMPONENT_INFO_TABS } from '../../constants/component-info.constants';
import { PROPERTY_TYPES } from '@annuadvent/ngx-lib-docs/docs-common';



@Component({
  selector: 'anu-component-info',
  templateUrl: './component-info.component.html',
  styleUrls: ['./component-info.component.scss']
})
export class ComponentInfoComponent implements OnInit {
  @Input() componentInfo: ComponentInfo;

  tabs = COMMPONENT_INFO_TABS.map(t => ({ ...t }));
  activeTab = this.tabs[1];
  propertyTypes: typeof PROPERTY_TYPES = PROPERTY_TYPES;


  constructor() { }

  ngOnInit(): void {

  }

  public tabChanged(tab: Tab) {
    this.activeTab = tab;
  }

}
