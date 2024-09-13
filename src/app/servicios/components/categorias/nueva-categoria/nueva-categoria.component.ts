import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Categoria from 'src/app/servicios/modelos/Categoria';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.scss']
})
export class NuevaCategoriaComponent implements OnInit {

  validationService: FormGroup;
  newCategoria: Categoria = {};

  /* Vienen de un servicio */ 

    grupos: Array<any> = [];
    agentes: Array<any> = [];

  /**************************/

  @Output()  onAddCategory: EventEmitter<Categoria> = new EventEmitter();
  @Output()  onCloseComponentNewContegory: EventEmitter<any> = new EventEmitter();

  constructor(  private fb: FormBuilder,
                private router: Router
    
  ){

     this.validationService = this.fb.group({

      nombre :  ["", Validators.compose( [Validators.required])],
      grupo:    [""],
      estatus:  [""],
      politicaAcceso: [""],
      agentes:  [""],
      descripcion: [""]
     });
      
     /*  ------------------ Estos vienen de un servicio ----------------------- */
     this.grupos = [
        {nombre: 'grupo1', id: 1},
        {nombre: 'grupo2', id: 2},
        {nombre: 'grupo3', id: 3},
      ];

      
      this.agentes= [
        {nombre: 'Agente1', id: 1},
        {nombre: 'Agente2', id: 2},
      ];
    }

     /* ------------------------------------------------------------------------------- */

  ngOnInit(): void {}



 addCategory(): void{
  
  if (this.validationService.invalid) {
    return Object.values( this.validationService.controls).forEach( control => {
        control.markAsTouched();
    });
  }else{
       this.onAddCategory.emit(this.newCategoria)
  }
}


cancel():void{
   this.newCategoria = {}
   this.onCloseComponentNewContegory.emit()
}

onChangeGrupo(): void{
    
}

get invalidCategoria() {
       return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
}

}
