import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MessageService } from "primeng/api";
import { ServiciosService } from 'src/app/servicios/services/servicios.service';
import Servicio from '../../../modelos/Servicio';


@Component({
  selector: 'app-nuevoServicio',
  templateUrl: './nuevoServicio.component.html',
  styleUrls: ['./nuevoServicio.component.scss'],
  providers: [MessageService]
})
export class NuevoServicioComponent implements OnInit {

  items: MenuItem[];
  optionMenu : number;


  public newService: Servicio= {};
  
  constructor(  private fb: FormBuilder,
                private service: ServiciosService,
                private router: Router
                
             ) {

      this.items = []
      this.optionMenu = 1;        /*   opción por default */
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
  }

  temporaryService(newService: Servicio){
        this.newService = newService;
  }


  addService(newService: Servicio){

    let validation = false;

    if(newService.nombre == null){
        validation= true;
    }
    if(newService.descripcion == null){
        validation = true;
    }
    if(newService.idGrupo == null){
        validation = true;
    }

    if(!validation){

          this.service
               .addServicio(newService).subscribe(
                   servicio =>  this.service.listServices.push(servicio)
           );
       
          //this.service.listServices.push(newService)
          this.router.navigate(['servicios/listado']);
    }
  }

}

