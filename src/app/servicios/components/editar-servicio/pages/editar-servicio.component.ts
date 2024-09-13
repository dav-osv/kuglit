import { Component, OnInit } from '@angular/core';
import  Servicio from 'src/app/servicios/modelos/Servicio';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MessageService } from "primeng/api";
import { ServiciosService } from 'src/app/servicios/services/servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.scss']
})
export class EditarServicioComponent implements OnInit {

  public editService: Servicio= {};
  items: MenuItem[];
  optionMenu : number;

  constructor( private services: ServiciosService,
               private router: Router) { 
     
      this.items = []
      this.optionMenu = 1; 
      this.editService =  this.services.getService() 
      //console.log(this.editService);     
  }



  ngOnInit(): void {

    this.items = [
      {
        label: 'Datos Generales',
        command: () => {
          this.optionMenu = 1;
        }

      },
      {
        label: 'SLAS',
        command: () => {
          this.optionMenu = 2;
        }

      },
      {
        label: 'Proveedor',
        command: () => {
          this.optionMenu = 3;
        }

      },
      {
        label: 'Usuarios',
        command: () => {
          this.optionMenu = 4;
        }

      },
      {
        label: 'Categorias',
        command: () => {
            this.optionMenu = 5;
        }
      },
      {
        label: 'Contactos',
        command: () => {
          this.optionMenu  = 6;
        }

      }

    ]
    this.editService =  this.services.getService() 
  }

  temporaryService(editService: Servicio){
      this.editService = editService;
  }

  updateService(updateService: Servicio){
    let validation = false;

    if(updateService.nombre == null){
        validation= true;
    }
    if(updateService.descripcion == null){
        validation = true;
    }
    if(updateService.idGrupo == null){
        validation = true;
    }

    if(!validation){


      if (updateService) {

          console.log(updateService)

          // this.services.update(updateService)
          //   .subscribe(service => {
          //      const ix = service ? this.services.listServices.findIndex(h => h.id === service.id) : -1;
          //        if (ix > -1) {
          //          this.services.listServices[ix]= service;
          //        }
          //     }); 

           const ix = updateService ? this.services.listServices.findIndex(h => h.id === updateService.id) : -1;
            if (ix > -1) {
                 this.services.listServices[ix] = updateService;
            }
            this.router.navigate(['servicios/listado']);
       }
    }
  }
  

}
