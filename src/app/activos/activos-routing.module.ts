import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { ActivosModule } from "./activos.module"; 
import { ActivosComponent } from "./pages/activos/activos.component"; 

const routes: Routes = [
    {
        path: "activos",
        component: ActivosComponent,
        children: [
            {
                path: '',
                redirectTo: "activos"
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivosRoutingModule {}