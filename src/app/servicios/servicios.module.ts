import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
// pages

import { ServiciosComponent } from './pages/servicios/servicios.component';
// Modulos
// Componentes
import { NuevoServicioComponent } from './components/nuevo-servicio/pages/nuevoServicio.component';
import { ListadoServiciosComponent } from './components/listado-servicios/listado-servicios.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {PaginatorModule} from 'primeng/paginator';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from "primeng/toast";
import {DividerModule} from 'primeng/divider';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ConfirmDialogModule} from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar'
import {CheckboxModule} from 'primeng/checkbox';
import {TabViewModule} from 'primeng/tabview';
//import { BrowserModule } from '@angular/platform-browser';
import {CardModule} from 'primeng/card';
import { SharedModule } from '../shared/shared.module';
import { SLASComponent } from './components/nuevo-servicio/slas/slas.component';
import { DatosGeneralesComponent } from './components/nuevo-servicio/datos-generales/datos-generales.component';
import { ProveedorComponent } from './components/nuevo-servicio/proveedor/proveedor.component';
import { ActivosComponent } from './components/nuevo-servicio/activos/activos.component';
import { UsuariosComponent } from './components/nuevo-servicio/usuarios/usuarios.component';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ListadoCategoriasComponent } from './components/categorias/listado-categorias/listado-categorias.component';
import { NuevaCategoriaComponent } from './components/categorias/nueva-categoria/nueva-categoria.component';
import { CategoriasComponent } from './components/categorias/pages/categorias.component';
import { EditarSubcategoriasComponent } from './components/subcategorias/editar-subcategorias/editar-subcategorias.component';
import { NuevaSubcategoriaComponent } from './components/subcategorias/nueva-subcategoria/nueva-subcategoria.component';
import { ListadoSubcategoriasComponent } from './components/subcategorias/listado-subcategorias/listado-subcategorias.component';
import { SubcategoriasComponent } from './components/subcategorias/pages/subcategorias.component';
import { FormularioComponent } from './components/editar-servicio/formulario/pages/formulario/formulario.component';
import { NuevaSeccionComponent } from './components/editar-servicio/formulario/nueva-seccion/nueva-seccion.component';
import { EditarSeccionComponent } from './components/editar-servicio/formulario/editar-seccion/editar-seccion.component';
import { EditarServicioComponent } from './components/editar-servicio/pages/editar-servicio.component';
import { DatosGeneralesEditComponent } from './components/editar-servicio/datos-generales-edit/datos-generales-edit.component';
import { SeccionComponent } from './components/editar-servicio/formulario/seccion/seccion.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { EditarCategoriaComponent } from './components/categorias/editar-categoria/editar-categoria.component';
import { EditarCategoriaPadreComponent } from './components/categorias/editar-categoria/pages/editar-categoria-padre.component';
import { NuevoContactoComponent } from './components/contactos/nuevo-contacto/nuevo-contacto.component';
import { EditarContactoComponent } from './components/contactos/editar-contacto/editar-contacto.component';
import { ContactoComponent } from './components/contactos/pages/contacto/contacto.component';
import { ListadoContactosComponent } from './components/contactos/listado-contacto/listado-contactos.component';
import { ProveedorEditComponent } from './components/editar-servicio/proveedor-edit/proveedor-edit.component';
import { SlasEditComponent } from './components/editar-servicio/slas-edit/slas-edit.component';
import { UsuariosEditComponent } from './components/editar-servicio/usuarios-edit/usuarios-edit.component';
import { ContactosEditComponent } from './components/editar-servicio/contactos-edit/pages/contactos-edit.component';
import { ListadoPreguntaComponent } from './components/editar-servicio/formulario/pregunta/listado-pregunta/listado-pregunta.component';
import { NuevaPreguntaComponent } from './components/editar-servicio/formulario/pregunta/nueva-pregunta/nueva-pregunta.component';
//import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    ServiciosComponent,
    NuevoServicioComponent,
    ListadoServiciosComponent,
    ListadoCategoriasComponent,
    ListadoContactosComponent,
    SLASComponent,
    DatosGeneralesComponent,
    ProveedorComponent,
    ActivosComponent,
    NuevaCategoriaComponent,
    CategoriasComponent,
    EditarCategoriaComponent,
    UsuariosComponent,
    EditarSubcategoriasComponent,
    NuevaSubcategoriaComponent,
    ListadoSubcategoriasComponent,
    SubcategoriasComponent,
    FormularioComponent,
    NuevaSeccionComponent,
    EditarSeccionComponent,
    EditarServicioComponent,
    DatosGeneralesEditComponent,
    SeccionComponent,
    SubmenuComponent,
    EditarCategoriaPadreComponent,
    NuevoContactoComponent,
    EditarContactoComponent,
    ContactoComponent,
    DatosGeneralesEditComponent,
    ProveedorEditComponent,
    SlasEditComponent,
    UsuariosEditComponent,
    ContactosEditComponent,
    ListadoPreguntaComponent,
    NuevaPreguntaComponent,
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    MultiSelectModule,
    CalendarModule,
    PaginatorModule,
    SelectButtonModule,
    TableModule,
    PanelModule,
    PanelMenuModule,
   // BrowserModule,
  //  BrowserAnimationsModule, 
    FormsModule,
    StepsModule,
    ToastModule,
    CardModule,
    ReactiveFormsModule,
    DividerModule,
    InputSwitchModule,
    ConfirmDialogModule,
    SidebarModule,
    CheckboxModule,
    TabViewModule,
    SharedModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule
  ]
  
  ,
  providers: [ConfirmationService],
})
export class ServiciosModule { }
