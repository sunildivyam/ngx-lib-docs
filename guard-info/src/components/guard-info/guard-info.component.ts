import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { GuardInfo } from '@annuadvent/ngx-lib-docs/docs-common';
import { GUARD_INFO_TABS } from '../../constants/guard-info.constants';
import { PROPERTY_TYPES } from '@annuadvent/ngx-lib-docs/docs-common';

@Component({
  selector: 'anu-guard-info',
  templateUrl: './guard-info.component.html',
  styleUrls: ['./guard-info.component.scss']
})
export class GuardInfoComponent implements OnInit {
  @Input() guardInfo: GuardInfo;

  tabs = GUARD_INFO_TABS.map(t => ({ ...t }));
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
