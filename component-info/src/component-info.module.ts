import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { ComponentInfoComponent } from './components/component-info/component-info.component';
import { ComponentPropsModule } from '@annuadvent/ngx-lib-docs/component-props';
import { CollapsibleModule } from '@annuadvent/ngx-common-ui/collapsible';
import { ToggleModule } from '@annuadvent/ngx-common-ui/toggle';
import { ComponentUsageComponent } from './components/component-usage/component-usage.component';


@NgModule({
  declarations: [
    ComponentInfoComponent,
    ComponentUsageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    CardModule,
    CodeBlockModule,
    ErrorModule,
    CollapsibleModule,
    ToggleModule,
    ComponentPropsModule,
  ],
  exports: [
    ComponentInfoComponent,
    ComponentUsageComponent,
  ],
})
export class ComponentInfoModule { }
