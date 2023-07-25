import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassInfoComponent } from './components/class-info/class-info.component';
import { ComponentPropsModule } from '@annuadvent/ngx-lib-docs/component-props';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';

@NgModule({
  declarations: [
    ClassInfoComponent
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
    ClassInfoComponent
  ],
})
export class ClassInfoModule { }
