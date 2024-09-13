import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Servicio from 'src/app/servicios/modelos/Servicio';
import { AutoCompleteService } from 'src/app/servicios/services/auto-complete.service';
import { UbicacionesService } from 'src/app/ubicaciones/services/ubicaciones.service';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss']
})
export class DatosGeneralesComponent implements OnInit {

  
  // public grupos: any[] = [];
  // public duenios: any[] = [];

  public listAsignacionDirecta: any[] = [];
  public listAsignacionReporte: any[] = [];
  public listProveedores: any[] = [];
  public localidades1: any[] = [];
  public listServicios: any[] = [];
  diasOptions: any[] = [];
  validationService: FormGroup;

  @Input() newService: Servicio= {};
  @Output() onAddService: EventEmitter<Servicio> = new EventEmitter(); 
  
 
  /* Vienen de un servicio */ 

      grupos : Array<any> = [];
      duenios : Array<any> = [];


 /**************************/

  
  constructor(public messageService: MessageService, 
             private router: Router, 
             private fb: FormBuilder, 
             private autoComplete: AutoCompleteService,
             private ubicaciones: UbicacionesService) { 
             this.fieldsEnabledByDefault();

             this.newService.tipoServicio = 1;

             this.validationService = this.fb.group({
                  nombre: [""],
                  descripcion: [""],
                  grupo: [""],
                  logotipo: [""],                  
                  dueno: [""],
                  asignacionDirecta: [""],
                  asignacionReporte: [""],
                  serviciosRelacionados: [""],
                  estatus: [""],
                  dias:[""],                        
                  horaInicial:[""],
                  minutoInicial:[""],
                  horaFinal:[""],
                  minutoFinal:[""],
                  hora24:[""],                      
                  mantenimiento: [""],              
                  disponibilidadHora: [""],        
                  disponibilidadMinuto: [""],       
                  tipoServicio: ["1"],              
                  proveedor:[""],
                  objetivos:[""], 
                  caracteristicas:[""],
                  procedimientos:[""],
                  alcances: [""],
            });     
  
             
     /*  ------------------Nota, vienen de un servicio  ------------------------------ */
          
          this.grupos = [
             { nombre: 'Grupo1', id: 1 },
             { nombre: 'Grupo2', id: 2 },
          ]


          this.duenios = [
            { nombre: 'dueño1', id: 1 },
            { nombre: 'dueño2', id: 2 },
         ]

     /* ------------------------------------------------------------------------------- */ 
     
      this.newService.dia365 = true;
      this.newService.horario24 = true;
      this.newService.estatus = true;
      this.newService.tipoServicio = 1;
          
  }

  

  ngOnInit(): void {}
  

  fieldsEnabledByDefault(): void{

    this.diasOptions = [
      { name: 'Lun', value: 1 },
      { name: 'Mar', value: 2 },
      { name: 'Mie', value: 3 },
      { name: 'Jue', value: 4 },
      { name: 'Vie', value: 5 },
      { name: 'Sáb', value: 6 },
      { name: 'Dom', value: 7 },
      { name: '7/365', value: 8 }
    ]
  }



  cancel(): void{
      this.router.navigate(['servicios/listado']);
  }

  addService(): void{
  
     if (this.validationService.invalid) {
        return Object.values( this.validationService.controls).forEach( control => {
           control.markAsTouched();
       });
     }else{
             this.onAddService.emit(this.newService);
     }
  }

  async getGrupos() {
    // this.grupos = await this.autoComplete.autoCompleteGrupo(1, "")
  }
  
  public async onChangeGrupo() {

    try {
      if (this.newService.idGrupo) {

        // this.duenios = await this.autoComplete.autoCompleteDuenio(this.newService.idGrupo, "")
        // this.listAsignacionDirecta = await this.autoComplete.autocompleteAsignacionDirecta(this.newService.idGrupo, "")
        // this.listAsignacionReporte = await this.autoComplete.autoCompleteReporteador(this.newService.idGrupo, "")
        // //   this.listServicios:
        // this.listProveedores = await this.autoComplete.autocompleteProveedores(this.newService.idGrupo, "")
        // this.localidades1 = await this.ubicaciones.autocompleteLocalidad1(this.newService.idGrupo, "")
      }
    } catch (error) {
      console.log(error)
    }
  }




  /*  Functions validation   */

  get invalidName() {
    return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
  }

  get invalidDescription() {
    return this.validationService.get('descripcion')?.invalid && this.validationService.get('descripcion')?.touched;
  }

  get invalidGroup() {
    return this.validationService.get('grupo')?.invalid && this.validationService.get('grupo')?.touched;
  }
  
  /* Fin de functions validation */

}
