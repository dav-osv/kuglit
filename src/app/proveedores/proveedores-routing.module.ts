import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { ProveedoresModule } from "./proveedores.module"; 
import { ProveedoresComponent } from "./pages/proveedores/proveedores.component"; 

const routes: Routes = [
    {
        path: "proveedores",
        component: ProveedoresComponent,
        children: [
            {
                path: '',
                redirectTo: "proveedores"
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedoresRoutingModule {}