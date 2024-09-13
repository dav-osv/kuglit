import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Servicio from 'src/app/servicios/modelos/Servicio';
import { AutoCompleteService } from 'src/app/solicitudes/services/auto-complete.service';

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.scss']
})
export class ProveedorEditComponent implements OnInit {

  @Input() editService: Servicio= {};
  @Output() onUpdateService: EventEmitter<Servicio> = new EventEmitter(); 
  validationService: FormGroup ;

   /* Vienen de un servicio */ 
     proveedores: Array<any> = [];
  /**************************/



  constructor( private fb: FormBuilder,
               private autoComplete: AutoCompleteService,
               private router:Router
              ) { 

       this.validationService = this.fb.group({
          proveedor: [""], 
       });

    /*  ------------------Nota, vienen de un servicio  ------------------------------ */
   
       this. proveedores= [
           {nombre: 'proveedor1', id: '1'},
           {nombre: 'proveedor2', id: '2'},
      ];

   /* ------------------------------------------------------------------------------- */
   
   

  }

  ngOnInit(): void {
    
  }

  cancel(): void{
    this.router.navigate(['servicios/listado']);
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
}
