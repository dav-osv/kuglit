import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Servicio from 'src/app/servicios/modelos/Servicio';

@Component({
  selector: 'app-slas-edit',
  templateUrl: './slas-edit.component.html',
  styleUrls: ['./slas-edit.component.scss']
})
export class SlasEditComponent implements OnInit {

  @Input() editService: Servicio= {};
  validationService: FormGroup ;
  @Output() onUpdateService: EventEmitter<Servicio> = new EventEmitter(); 


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

}
