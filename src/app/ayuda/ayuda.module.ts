import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { AyudaRoutingModule } from './ayuda-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AyudaComponent
  ],
  imports: [
    CommonModule,
    AyudaRoutingModule,
    SharedModule
  ]
})
export class AyudaModule { }
