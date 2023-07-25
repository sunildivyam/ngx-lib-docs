import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceInfoComponent } from './components/interface-info/interface-info.component';
import { ComponentPropsModule } from '@annuadvent/ngx-lib-docs/component-props';
import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';


@NgModule({
  declarations: [
    InterfaceInfoComponent
  ],
  imports: [
    CommonModule,
    TabsModule,
    SpinnerModule,
    ErrorModule,
    CodeBlockModule,
    ComponentPropsModule,
  ],
  exports: [
    InterfaceInfoComponent
  ],
})
export class InterfaceInfoModule { }
