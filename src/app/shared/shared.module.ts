import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
// Componentes
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BardaComponent } from './components/barda/barda.component';
import { HeaderAuthComponent } from './components/header-auth/header-auth.component';
import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import {PanelMenuModule} from 'primeng/panelmenu';
import { MainTitleComponent } from './components/sections/main-title/main-title.component';
import { NewSolicitudComponent } from './components/sections/new-solicitud/new-solicitud.component';



@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    BardaComponent,
    HeaderAuthComponent,
    MainTitleComponent,
    NewSolicitudComponent
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    BardaComponent,
    HeaderAuthComponent,
    MainTitleComponent,
    NewSolicitudComponent
  ],
  imports: [
    CommonModule, 
    SharedRoutingModule, 
    SidebarModule, 
    ButtonModule,
    PanelMenuModule,
  ],

  schemas:[ CUSTOM_ELEMENTS_SCHEMA ]
 
})
export class SharedModule {}
