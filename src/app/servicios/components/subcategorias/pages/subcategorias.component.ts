import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import Subcategoria from 'src/app/servicios/modelos/Subcategoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.scss']
})
export class SubcategoriasComponent implements OnInit {

  @Input()  subcategories: Array<Subcategoria> = []
  @Input()  editCategory: Categoria = {}
  @Output() onUpdateArraySubcategories: EventEmitter<Subcategoria[]> = new EventEmitter()

  public editSubcategory : Subcategoria = {}  
  public submittedAdd: boolean = false
  public submittedEdit: boolean = false
  public subcategoryDialogAdd: boolean = false
  public subcategoryDialogEdit: boolean = false

  constructor() {
  }

  ngOnInit(): void {}    
  

openModalnewSubcategory(){
    this.submittedAdd = true
    this.subcategoryDialogAdd = true
}

openModalEditSubcategory(subcategory: Subcategoria){
     this.editSubcategory  =  subcategory
     this.submittedEdit = true
     this.subcategoryDialogEdit = true
}


closeModalnewSubcategory(){
   this.submittedAdd = false
   this.subcategoryDialogAdd = false
}

  
closeModalEditSubcategory(){
    this.submittedEdit = false
    this.subcategoryDialogEdit = false
}


addSubcategory(subcategory: Subcategoria){
    this.subcategories.push(subcategory)
    this.closeModalnewSubcategory()
    this.onUpdateArraySubcategories.emit(this.subcategories)
 }

 updateSubcategory(subcategory : Subcategoria){
   const ix = subcategory ? this.subcategories.findIndex(h => h.id === subcategory.id) : -1;
     if (ix > -1) {
       this.subcategories[ix] = subcategory;
     }

    this.editCategory = {};
    this.closeModalEditSubcategory()
    this.onUpdateArraySubcategories.emit(this.subcategories)
 }

  deleteSubcategory(subcategory: Subcategoria){

    Swal.fire({
      title: 'Eliminar subcategoría',
      text: '¿Esta seguro que desea eliminar la subcategoría:'+subcategory.nombre+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'

   }).then( result => {

        if(result.value){
                 this.subcategories = this.subcategories.filter(h => h !== subcategory);
                 this.onUpdateArraySubcategories.emit(this.subcategories)
                 Swal.fire('Eliminado', 'La subcategoría se elimino con exito: ', 'success');
         }
    })
  }
}


