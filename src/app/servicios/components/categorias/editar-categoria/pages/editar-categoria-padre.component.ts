import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import Formulario from 'src/app/servicios/modelos/Formulario';
import Servicio from 'src/app/servicios/modelos/Servicio';
import Subcategoria from 'src/app/servicios/modelos/Subcategoria';


@Component({
  selector: 'app-editar-categoria-padre',
  templateUrl: './editar-categoria-padre.component.html',
  styleUrls: ['./editar-categoria-padre.component.scss']
})
export class EditarCategoriaPadreComponent implements OnInit {

  @Input()  editCategory: Categoria = {};
  @Input()  subcategories: Array<Subcategoria> = []
  @Input()  editService: Servicio = {}

  @Output() onUpdateCategory: EventEmitter<Categoria> = new EventEmitter()
  @Output() onCloseComponentEditCategory: EventEmitter<any> = new EventEmitter();

  public formulario: Formulario = {}

  public visibleCategoriaEdit = true;
  public visibleFormulario = false;
  public visibleSubcategoria = false;
  public title: string;

  constructor() { 
    this.visibleCategoriaEdit = true;
    this.visibleSubcategoria = false;
    this.visibleFormulario =  false;
    this.title = "Editar Categoria"
  }

  ngOnInit(): void {
     if(this.editCategory.subcategorias){
         this.subcategories = this.editCategory.subcategorias
     }else{
         this.subcategories = []
     }
  }
 
  openSubcategory(): void{
      this.visibleSubcategoria = true
      this.visibleCategoriaEdit = false
      this.visibleFormulario = false
      this.title = "Subcategorías"
  }


  openFormulario(): void{
      this.visibleCategoriaEdit = false
      this.visibleSubcategoria = false
      this.visibleFormulario = true
      this.title = "Formulario"
  }

  openEdit(): void{
      this.visibleCategoriaEdit = true
      this.visibleSubcategoria = false
      this.visibleFormulario = false
      this.title = "Editar categoría"
  }


  closeComponentEditCategory(){
      this.onCloseComponentEditCategory.emit()
  }


  updateArraySubcategories(subcategories: Array<Subcategoria>){
         this.subcategories = subcategories
  }

  updateForm(form: Formulario){
       this.formulario = form
  }

  updateCategory(category: Categoria): void{

       category.subcategorias = this.subcategories;
       this.editCategory = category;
       this.onUpdateCategory.emit(this.editCategory)
       
  }

}
