import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Servicio from 'src/app/servicios/modelos/Servicio';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {

  
  @Input() editService: Servicio= {};
  @Output() onUpdateService: EventEmitter<Servicio> = new EventEmitter(); 
  validationService: FormGroup;
  /*****************  Servicio  ******************/
      regiones:     Array<any> = [];
      localidades1: Array<any> = [];
      localidades2: Array<any> = [];
  /****************************************** */

  constructor( private fb: FormBuilder,
               private router: Router ) {

           this.validationService = this.fb.group({
                    region: [""],
                    localidad1: [""],
                    localidad2: [""],
          });




/*  ------------------Nota, vienen de un servicio  ------------------------------ */

this.regiones= [
{nombre: 'region1', id: '1'},
{nombre: 'region2', id: '2'},
] ;

this.localidades1= [
{nombre: 'localidad a', id: '1'},
{nombre: 'localidad b', id: '2'},
] ;

this.localidades2= [
{nombre: 'localidad a', id: '1'},
{nombre: 'localidad b', id: '2'},
] ;

/* ------------------------------------------------------------------------------- */

}

ngOnInit(): void {}

cancel(): void{
this.router.navigate(['servicios/listado']);
}

public async onChangeGrupo() {

try {
if (this.editService.idGrupo) {

// this.localidades1 = await this.ubicaciones.autocompleteLocalidad1(this.newService.idGrupo, "")
}
} catch (error) {
console.log(error)
}
}

updateService(){
  if (this.validationService.invalid) {
     return Object.values( this.validationService.controls).forEach( control => {
       control.markAsTouched();
  });
   }else{
    this.onUpdateService.emit(this.editService);
   } 
 }
}
