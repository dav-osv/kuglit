import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Servicio from 'src/app/servicios/modelos/Servicio';
import { AutoCompleteService } from 'src/app/solicitudes/services/auto-complete.service';
import { UbicacionesService } from 'src/app/ubicaciones/services/ubicaciones.service';

@Component({
  selector: 'app-datos-generales-edit',
  templateUrl: './datos-generales-edit.component.html',
  styleUrls: ['./datos-generales-edit.component.scss']
})
export class DatosGeneralesEditComponent implements OnInit {

  @Input() editService: Servicio= {};
  @Output() onUpdateService: EventEmitter<Servicio> = new EventEmitter(); 
   
  /* Vienen de un servicio */ 
    grupos : Array<any> = [];
    duenios : Array<any> = [];
    public listAsignacionDirecta: any[] = [];
    public listAsignacionReporte: any[] = [];
    public listProveedores: any[] = [];
    public localidades1: any[] = [];
    public listServicios: any[] = [];
/**************************/



  diasOptions: any[] = [];
  validationService: FormGroup;

  constructor( private router: Router, 
                private fb: FormBuilder) { 
    this.fieldsEnabledByDefault();
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
      {  nombre: 'dueño1', id: 1 },
      { nombre: 'dueño2', id: 2 },
   ]

/* ------------------------------------------------------------------------------- */  

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


  updateService(): void{
  
    if (this.validationService.invalid) {
       return Object.values( this.validationService.controls).forEach( control => {
          control.markAsTouched();
      });
    }else{
            this.onUpdateService.emit(this.editService);
    }
 }

 cancel(): void{
  this.router.navigate(['servicios/listado']);
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
