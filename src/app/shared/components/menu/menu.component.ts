import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public display: boolean = false

  public elements: MenuItem[] = [
    {
      label: 'Reportes',
      icon: "assets/images/menu/reportes_inactivo.svg",
      routerLink: "./dashboard",
      visible: true
    }, 
    {
      label: "Solicitudes",
      icon: "assets/images/menu/solicitudes_inactivo.svg",
      routerLink: "./solicitudes",
      visible: false
    }, 

    {
      label: "Proveedores",
      icon: "assets/images/menu/proveedores_inactivo.svg",
      routerLink: "./proveedores",
      visible: false
    }, 
    
    {
      label: "Activos",
      icon: "assets/images/menu/activos_inactivo.svg",
      routerLink: "./activos",
      visible: false
    }, 

    {
      label: "Configuracion",
      icon: "assets/images/menu/configuracion_inactivo.svg",
      visible: true,
      items: [
        {
          label: "Servicios",
          icon: "assets/images/menu/servicios_inactivo.svg",
          routerLink: "./servicios",
          visible: false
        }
      ],
      
    }, {
      label: "Ayuda",
      icon: "assets/images/menu/ayuda_inactivo.svg",
      visible: false,
      routerLink: "./ayuda",
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
