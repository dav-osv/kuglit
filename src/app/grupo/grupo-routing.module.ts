import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// pages
import { GrupoComponent } from './pages/grupo/grupo.component';
import { ListadoGruposComponent } from './pages/listado-grupos/listado-grupos.component';
// Componentes
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

const routes: Routes = [
  {
    path: 'listado',
    component: ListadoGruposComponent,
  },
  {
    path: 'listado/grupo/:id',
    component: GrupoComponent,
    children: [
      {
        path: 'calendarioLiberaciones/:id',
        component: CalendarioLiberacionesComponent,
      },
      {
        path: 'configuracion/:id',
        component: ConfiguracionComponent,
      },
      {
        path: 'configuracionReporte/:id',
        component: ConfiguraconReporteComponent,
      },
      {
        path: 'cuestionarioActivos/:id',
        component: CuestionarioParaActivosComponent,
      },
      {
        path: 'cuestionarioOrdenes/:id',
        component: CuestionarioParaOrdenesComponent,
      },
      {
        path: 'cuestionarioProveedores/:id',
        component: CuestionarioParaProveedoresComponent,
      },
      {
        path: 'cuestionarioUsuarios/:id',
        component: CuestionarioParaUsuariosComponent,
      },
      {
        path: 'dominio/:id',
        component: DominioComponent,
      },
      {
        path: 'gruposSoporte/:id',
        component: GruposDeSoporteComponent,
      },
      {
        path: 'permisos/:id',
        component: PermisosComponent,
      },
      {
        path: '',
        redirectTo: 'dominio/:id',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoRoutingModule {}
