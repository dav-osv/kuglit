import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivosComponent } from './pages/activos/activos.component';
import { SharedModule } from '../shared/shared.module';
import { ActivosRoutingModule } from './activos-routing.module';



@NgModule({
  declarations: [
    ActivosComponent
  ],
  imports: [
    CommonModule,
    ActivosRoutingModule,
    SharedModule
  ]
})
export class ActivosModule { }
