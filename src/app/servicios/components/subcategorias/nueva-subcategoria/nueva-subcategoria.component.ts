import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Subcategoria from 'src/app/servicios/modelos/Subcategoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-subcategoria',
  templateUrl: './nueva-subcategoria.component.html',
  styleUrls: ['./nueva-subcategoria.component.scss']
})
export class NuevaSubcategoriaComponent implements OnInit {

  public validationService: FormGroup;
  newSubcategory: Subcategoria = {};
  agentes: Array<any> = [];

  @Output() onCloseModalnewSubcategory:  EventEmitter<any> = new EventEmitter();
  @Output() onAddSubcategory: EventEmitter<Subcategoria> = new EventEmitter();

  constructor(private activatedRouter: ActivatedRoute,
                private fb: FormBuilder) {
    
    this.validationService = this.fb.group({

      nombre :  ["", Validators.compose( [Validators.required])],
      grupo:    [""],
      estatus:  [""],
      politicaAcceso: [""],
      agentes:  [""],
      descripcion: [""]

   });
  
   /* ---------------- Viene de un servicio  -------------------- */
      this.agentes= [
        {nombre: 'Agente1', id: '1'},
        {nombre: 'Agente2', id: '2'},
      ];
   /* ------------------------------------------------------------*/

  }

  ngOnInit(): void {

    this.validationService = this.fb.group({

      nombre :  ["", Validators.compose( [Validators.required])],
      grupo:    [""],
      estatus:  [""],
      politicaAcceso: [""],
      agentes:  [""],
      descripcion: [""]

   });

  }

  saveSubcategory(): void{
    if (this.validationService.invalid) {
      return Object.values( this.validationService.controls).forEach( control => {
         control.markAsTouched();
      });
    }else{
           this.onAddSubcategory.emit(this.newSubcategory);
           this.newSubcategory = {}
    }
  }

  cancel(): void{
      this.newSubcategory = {}
      this.onCloseModalnewSubcategory.emit();
  }

  get invalidSubcategoria() {
     return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
  }

}
