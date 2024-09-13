import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Servicio from 'src/app/servicios/modelos/Servicio';

@Component({
  selector: 'app-slas',
  templateUrl: './slas.component.html',
  styleUrls: ['./slas.component.scss']
})
export class SLASComponent implements OnInit {

  @Input() newService: Servicio= {};
  validationService: FormGroup ;
  @Output() onAddService: EventEmitter<Servicio> = new EventEmitter(); 


  constructor( private router: Router,
               private fb: FormBuilder, ) { 
   
   

   this.validationService = this.fb.group({

      dia1: [""], 
      dia2: [""], 
      dia3: [""], 
      dia4: [""],
      dia5: [""],
      hora1: [""], 
      hora2: [""],
      hora3: [""],
      hora4: [""],
      hora5: [""],
      minuto1: [""],
      minuto2: [""],
      minuto3: [""],
      minuto4: [""],
      minuto5: [""]
   });


  }

  ngOnInit(): void {
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


 cancel(): void{
    this.router.navigate(['servicios/listado']);
 }

}
