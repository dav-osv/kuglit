import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html'
})
export class ListadoCategoriasComponent implements OnInit {

   @Input() categories: Array<Categoria> = [];
   @Output() onOpenComponentNewCategory: EventEmitter<any> = new EventEmitter();
   @Output() onOpenComponentEditCategory: EventEmitter<Categoria> = new EventEmitter();
   @Output() onOpenModalDeleteCategory: EventEmitter<any> = new EventEmitter();

 public estatusList: number[];
 public status: any[] = [
  { name: "Activo", value: 1 },
  { name: "Inactivo", value: 2 }
 ]
 public grupo: number[] = [];
 public grupos: any[] = [];
 public busqueda: string;


 constructor() {
   this.estatusList = []
   this.grupo = []
   this.busqueda = ""
 }

  ngOnInit(): void {} 
   
  
  openComponentDeleteCategory(category: Categoria):void{
      this.onOpenModalDeleteCategory.emit(category)
   }
   openComponentEditCategory(category: Categoria):void{
         this.onOpenComponentEditCategory.emit(category)
   } 
  
   openComponentNewCategory(){
           this.onOpenComponentNewCategory.emit();
   }
   
  async onChangePage(event: any) {}
  async limpiarFiltro() {}
  async onChangeEstatus() {}
  public async onChangeGrupo() {}
  public async showSearchResults() {}


}

