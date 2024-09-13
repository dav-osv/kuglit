
import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import Servicio from 'src/app/servicios/modelos/Servicio';
import Swal from 'sweetalert2';
import { CategoriaService } from '../services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  @Input() newService: Servicio  = {}
  @Input() editService: Servicio = {}
  @Input() type: string =  ""

  @Output() onUpdateService: EventEmitter<Servicio> = new EventEmitter()
  @Output() onAddService: EventEmitter<Servicio> = new EventEmitter()
  @Output() onTemporaryService: EventEmitter<Servicio> = new EventEmitter()


  public categories: Array<Categoria> = []
  public editCategory: Categoria={}
  public newCategory: Categoria ={}

  visibleList = true
  visibleNewCategoria = false;
  visibleEditCategoria = false;

  constructor(private serviceCategories: CategoriaService) {
          
  }

  ngOnInit(): 
  
  void { 

    if(this.type == "newService"){
      if(this.newService.categorias)
           this.categories = this.newService.categorias
    }else{
      if(this.editService.categorias){
           this.categories = this.editService.categorias
      }
    }
  }


  openComponentNewCategory(){
     this.visibleList = false
     this.visibleNewCategoria = true;
  }
  
  openComponentEditCategory(category: Categoria){
  
       this.editCategory = category;
       this.visibleList = false
       this.visibleEditCategoria = true;
  }

  closeComponentNewCategory(){
     this.visibleList = true
     this.visibleNewCategoria = false;
  }

  closeComponentEditCategory(){
    this.visibleList = true
    this.visibleEditCategoria = false;
 }
 

  addCategory(categoria: Categoria){

    this.categories.push(categoria)

    if(this.type == "newService"){
        this.newService.categorias = this.categories
        this.closeComponentNewCategory()
        this.onTemporaryService.emit(this.newService)
    }else{
       
       this.serviceCategories
           .addCategory(categoria)
           .subscribe( response => this.categories.push(categoria))
    }
  }

  

  updateCategory(category: Categoria){

    const ix = category ? this.categories.findIndex(h => h.id === category.id) : -1;
      if (ix > -1) {
        this.categories[ix] = category;
      }

    this.editCategory = {};

    if(this.type == "newService"){
         this.closeComponentEditCategory()
         this.newService.categorias = this.categories
         this.onTemporaryService.emit(this.newService)
    }else{
           this.serviceCategories.updateCategory(category)
            .subscribe(category => {
               const ix = category ? this.categories.findIndex(h => h.id === category.id) : -1;
                 if (ix > -1) {
                   this.categories[ix]= category;
                 }
           }); 
     }
  }

  deleteCategory(category: Categoria){

    Swal.fire({
      title: 'Eliminar categoria',
      text: '¿Esta seguro que desea eliminar la categoría:' + category.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
   }).then( result => {

          if(result.value){

             if(this.type == "newService"){
              this.categories = this.categories.filter(h => h !== category);
              this.newService.categorias = this.categories;
              this.onTemporaryService.emit(this.newService)
             }else{

                this.serviceCategories.deleteCategory(category.id?category.id:0)
                 .subscribe(res=>{
                     this.categories = this.categories.filter(h => h !== category);
                  });

             Swal.fire('Eliminado', 'Se ha eliminado la categoria: ', 'success');
          }
        }
     });
  }

   saveService(){
       this.onAddService.emit(this.newService)
   }
   
}
