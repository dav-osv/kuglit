import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { DashboardModule } from "./dashboard.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: "dashboard"
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashBoardRoutingModule {}