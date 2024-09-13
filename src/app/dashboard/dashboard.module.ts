import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashBoardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ], 
  imports: [
    DashBoardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {}