import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectiveInfoComponent } from './components/directive-info/directive-info.component';
import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';
import { ComponentPropsModule } from '@annuadvent/ngx-lib-docs/component-props';



@NgModule({
  declarations: [
    DirectiveInfoComponent
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
    DirectiveInfoComponent
  ],
})
export class DirectiveInfoModule { }
