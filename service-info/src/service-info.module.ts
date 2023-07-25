import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';
import { SearchBoxModule } from '@annuadvent/ngx-common-ui/search-box';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { CollapsibleModule } from '@annuadvent/ngx-common-ui/collapsible';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { ServiceInfoComponent } from './components/service-info/service-info.component';
import { ServiceMethodModule } from '@annuadvent/ngx-lib-docs/service-method';
import { ComponentPropsModule } from '@annuadvent/ngx-lib-docs/component-props';


@NgModule({
  declarations: [ServiceInfoComponent],
  imports: [
    CommonModule,
    TabsModule,
    CardModule,
    CodeBlockModule,
    SearchBoxModule,
    ServiceMethodModule,
    ComponentPropsModule,
    ErrorModule,
    CollapsibleModule,
    SpinnerModule,
  ],
  exports: [ServiceInfoComponent],
})
export class ServiceInfoModule { }
