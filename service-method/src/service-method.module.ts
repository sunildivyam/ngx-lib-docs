import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { ServiceMethodComponent } from './components/service-method/service-method.component';




@NgModule({
  declarations: [
    ServiceMethodComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
  ],
  exports: [
    ServiceMethodComponent
  ]
})
export class ServiceMethodModule { }
