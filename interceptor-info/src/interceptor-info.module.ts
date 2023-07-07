import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorInfoComponent } from './components/interceptor-info/interceptor-info.component';
import { ComponentPropsModule } from '@annuadvent/ngx-lib-docs/component-props';
import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';

@NgModule({
  declarations: [
    InterceptorInfoComponent
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
    InterceptorInfoComponent
  ],
})
export class InterceptorInfoModule { }
