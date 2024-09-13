import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoRoutingModule } from './grupo-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
// pages
import { GrupoComponent } from './pages/grupo/grupo.component';
import { ListadoGruposComponent } from './pages/listado-grupos/listado-grupos.component';
// components
import { CalendarioLiberacionesComponent } from './components/calendario-liberaciones/calendario-liberaciones.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ConfiguraconReporteComponent } from './components/configuracon-reporte/configuracon-reporte.component';
import { CuestionarioParaActivosComponent } from './components/cuestionario-para-activos/cuestionario-para-activos.component';
import { CuestionarioParaOrdenesComponent } from './components/cuestionario-para-ordenes/cuestionario-para-ordenes.component';
import { CuestionarioParaProveedoresComponent } from './components/cuestionario-para-proveedores/cuestionario-para-proveedores.component';
import { CuestionarioParaUsuariosComponent } from './components/cuestionario-para-usuarios/cuestionario-para-usuarios.component';
import { DominioComponent } from './components/dominio/dominio.component';
import { GruposDeSoporteComponent } from './components/grupos-de-soporte/grupos-de-soporte.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { TablaCuestionarioComponent } from './components/tabla-cuestionario/tabla-cuestionario.component';

@NgModule({
  declarations: [
    GrupoComponent,
    ListadoGruposComponent,
    CalendarioLiberacionesComponent,
    ConfiguracionComponent,
    ConfiguraconReporteComponent,
    CuestionarioParaActivosComponent,
    CuestionarioParaOrdenesComponent,
    CuestionarioParaProveedoresComponent,
    CuestionarioParaUsuariosComponent,
    DominioComponent,
    GruposDeSoporteComponent,
    PermisosComponent,
    TablaCuestionarioComponent,
  ],

  imports: [
    CommonModule,
    GrupoRoutingModule,
    FormsModule,
    AngularEditorModule,
  ],
  providers: [],
})
export class GrupoModule {}
