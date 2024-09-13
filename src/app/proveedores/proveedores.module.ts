import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProveedoresComponent,
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule
  ]
})
export class ProveedoresModule { }
