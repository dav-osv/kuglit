import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// Componentes layout
import { LayoutComponent } from './layout/layout.component';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';

const routes: Routes = [
  // layouth aut
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ],
  },
  // layouth General
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesModule ),
      },
      {
        path: '',
        loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule),
      }, 
      {
        path: '',
        loadChildren: () => import("./dashboard/dashboard.module").then( m => m.DashboardModule )
      }, 
      {
        path: '',
        loadChildren: () => import("./servicios/servicios.module").then(m => m.ServiciosModule )
      }, 
      {
        path: '',
         loadChildren: () => import("./proveedores/proveedores.module").then(m => m.ProveedoresModule )
      },
      {
        path: '',
         loadChildren: () => import("./proveedores/proveedores.module").then(m => m.ProveedoresModule )
      }, 
      {
         path: '',
         loadChildren: () => import("./activos/activos.module").then(m => m.ActivosModule)
      },
      {
        path: '',
        loadChildren: () => import("./ayuda/ayuda.module").then(m => m.AyudaModule)
     },
    ],
  },
  // page not-found
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
