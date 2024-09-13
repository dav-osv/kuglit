import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Subcategoria from 'src/app/servicios/modelos/Subcategoria';
import { SubcategoriasService } from '../services/subcategorias.service';

@Component({
  selector: 'app-editar-subcategorias',
  templateUrl: './editar-subcategorias.component.html',
  styleUrls: ['./editar-subcategorias.component.scss']
})
export class EditarSubcategoriasComponent implements OnInit {



  @Input()  editSubcategory: Subcategoria = {};
  @Output() onCloseModalEditSubcategory: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateSubcategory: EventEmitter<Subcategoria> = new EventEmitter();
  public validationService: FormGroup;
  agentes: Array<any> = [];


  constructor(  private subcategoriaService: SubcategoriasService,
                private fb: FormBuilder
                ) {
    
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
  }

  updateSubcategory(): void{
    if (this.validationService.invalid) {
      return Object.values( this.validationService.controls).forEach( control => {
         control.markAsTouched();
      });
    }else{
         this.onUpdateSubcategory.emit(this.editSubcategory)
    }
  }

  cancel(): void{
      this.onCloseModalEditSubcategory.emit();
  }

  get invalidSubcategoria() {
     return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
  }

}
