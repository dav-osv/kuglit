import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Categoria from 'src/app/servicios/modelos/Categoria';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit {

    @Input()  editCategory: Categoria = {};
    @Output() onUpdateCategory: EventEmitter<Categoria> = new EventEmitter()
    @Output() onCloseComponentEditCategory: EventEmitter<any> = new EventEmitter()

    public visibleCategoriaEdit = true;
    public visibleFormulario = false;
    public visibleSubcategoria = false;

    public validationService: FormGroup;

   /* Vienen de un servicio */ 
     grupos: Array<any> = [];
     agentes: Array<any> = [];

  constructor(private activatedRouter: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {

              this.visibleCategoriaEdit = true;
              this.visibleSubcategoria = false;
              this.visibleFormulario =  false;

          this.validationService = this.fb.group({

                  nombre :  [""],
                  grupo:    [""],
                  estatus:  [""],
                  politicaAcceso: [""],
                  agentes:  [""],
                  descripcion: [""]

    });

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

  ngOnInit(): void {}

  cancel(): void {
       this.onCloseComponentEditCategory.emit()
  }


  updateCategory(): void{

    if (this.validationService.invalid) {
      return Object.values( this.validationService.controls).forEach( control => {
         control.markAsTouched();
      });
    }else{
          this.onUpdateCategory.emit(this.editCategory)
    }
  }


  onChangeGrupo(): void{}


  
  get invalidCategoria() {
    return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
}


}
