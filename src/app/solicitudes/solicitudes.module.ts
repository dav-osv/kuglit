import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
// pages
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
// Modulos
// Componentes

import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService} from 'primeng/api';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { StepsModule } from "primeng/steps"
import {ListboxModule} from 'primeng/listbox';
import { DetalleSolicitudComponent } from './components/detalle-solicitud/detalle-solicitud.component';
import { NuevaSolicitudComponent } from './components/nueva-solicitud/nueva-solicitud.component';
import { ListadoSolicitudesComponent } from './components/listado-solicitudes/listado-solicitudes.component';
import {InplaceModule} from 'primeng/inplace';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {AvatarModule} from 'primeng/avatar';
import {RatingModule} from 'primeng/rating';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import { TagModule } from 'primeng/tag';

import { MensajesService } from './services/mensajes.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SolicitudesComponent,
    DetalleSolicitudComponent,
    NuevaSolicitudComponent,
    ListadoSolicitudesComponent,
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    MultiSelectModule,
    CalendarModule,
    PaginatorModule,
    SelectButtonModule,
    TableModule,
    InputTextareaModule,
    FileUploadModule,
    ToastModule,
    CascadeSelectModule,
    StepsModule,
    ListboxModule,
    InplaceModule,
    ToggleButtonModule,
    AvatarModule,
    RatingModule,
    ConfirmDialogModule,
    DropdownModule,
    TabViewModule,
    TagModule,
    SharedModule

  ],
  providers: [
    MessageService,
    MensajesService,
    ConfirmationService
  ]

})
export class SolicitudesModule { }
