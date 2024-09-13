import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleSolicitudComponent } from './components/detalle-solicitud/detalle-solicitud.component';
import { ListadoSolicitudesComponent } from './components/listado-solicitudes/listado-solicitudes.component';
import { NuevaSolicitudComponent } from './components/nueva-solicitud/nueva-solicitud.component';
// pages
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
// Componentes

const routes: Routes = [
  {
    path: 'solicitudes',
    component: SolicitudesComponent,
    children: [
      {
        path: 'listado',
        component: ListadoSolicitudesComponent,
      },
      {
        path: '',
        redirectTo: 'listado',
      },
      {
        path: "nuevaSolicitud",
        component: NuevaSolicitudComponent
      }, {
        path: "detalleSolicitud",
        component: DetalleSolicitudComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesRoutingModule {}
