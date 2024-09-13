import { Component, EventEmitter, OnInit, Input,Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Servicio from 'src/app/servicios/modelos/Servicio';
import { AutoCompleteService } from 'src/app/servicios/services/auto-complete.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  
  
  @Input() newService: Servicio= {};
  @Output() onAddService: EventEmitter<Servicio> = new EventEmitter(); 
  validationService: FormGroup ;

  // public grupos: any[] = [];

   /* Vienen de un servicio */ 

     proveedores: Array<any> = [];


  /**************************/



  // public listProveedores: Array<any> = [
  //   { name: "Proveedor1", id: 1 },
  //   { name: "Proveedor2", id: 2 }
  //  ]


  constructor(private router: Router,
              private fb: FormBuilder,
              private autoComplete: AutoCompleteService) { 

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

 addService(): void{
   if (this.validationService.invalid) {
    return Object.values( this.validationService.controls).forEach( control => {
        control.markAsTouched();
    });
  }else{ 
       this.onAddService.emit(this.newService);
   }
 }

}
