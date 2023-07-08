import { Component, Input, OnInit, Type } from '@angular/core';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { ComponentInfo, DocsData, PROPERTY_TYPES } from '@annuadvent/ngx-lib-docs/docs-common';
import { COMMPONENT_INFO_TABS } from '../../constants/component-info.constants';



@Component({
  selector: 'anu-component-info',
  templateUrl: './component-info.component.html',
  styleUrls: ['./component-info.component.scss']
})
export class ComponentInfoComponent implements OnInit {
  /**
   * Component info, that usually comes from the compdoc generated json.
   */
  @Input() componentInfo: ComponentInfo;
  /**
     * Component Class, eg. MenuComponent, TabsComponent etc.
     */
  @Input() componentType: Type<any> = null;
  /**
   * Component Usage sample data, usually comes from "component-name.docs.ts" file
   * present in the component's folder.
   */
  @Input() componentData: DocsData = null;

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
