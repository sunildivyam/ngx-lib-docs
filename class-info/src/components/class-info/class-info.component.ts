import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { ClassInfo } from '@annuadvent/ngx-lib-docs/docs-common';
import { CLASS_INFO_TABS } from '../../constants/class-info.constants';
import { PROPERTY_TYPES } from '@annuadvent/ngx-lib-docs/docs-common';

@Component({
  selector: 'anu-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.scss']
})
export class ClassInfoComponent implements OnInit {
  @Input() classInfo: ClassInfo;

  tabs = CLASS_INFO_TABS.map(t => ({ ...t }));
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
