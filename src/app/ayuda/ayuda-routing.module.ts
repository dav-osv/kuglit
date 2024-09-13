import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AyudaModule } from "./ayuda.module";
import { AyudaComponent } from "./pages/ayuda/ayuda.component";

const routes: Routes = [
    {
        path: "ayuda",
        component: AyudaComponent,
        children: [
            {
                path: '',
                redirectTo: "ayuda"
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AyudaRoutingModule {}