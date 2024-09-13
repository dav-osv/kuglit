import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// pages
import { ServiciosComponent } from './pages/servicios/servicios.component';

// Componentes
import { NuevoServicioComponent } from './components/nuevo-servicio/pages/nuevoServicio.component';
import { ListadoServiciosComponent } from './components/listado-servicios/listado-servicios.component';
import { EditarServicioComponent } from './components/editar-servicio/pages/editar-servicio.component';
import { SeccionComponent } from './components/editar-servicio/formulario/seccion/seccion.component';

const routes: Routes = [
  {
    path: 'servicios',
    component: ServiciosComponent,
  
  children: [

      {
        path: 'listado',
        component: ListadoServiciosComponent,
      },

      {
        path: 'nuevo',
        component: NuevoServicioComponent,
      },
      {  
        path: 'editar',
        component: EditarServicioComponent,
      },
      {
        path: '',
        redirectTo: 'listado',
      },
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosRoutingModule {}
