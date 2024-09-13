import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import Subcategoria from 'src/app/servicios/modelos/Subcategoria';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listado-subcategorias',
  templateUrl: './listado-subcategorias.component.html',
  styleUrls: ['./listado-subcategorias.component.scss']
})
export class ListadoSubcategoriasComponent implements OnInit {
 
public estatusList: number[]
@Input() subcategories: Array<Subcategoria> = []

@Output() onOpenModalnewSubcategory: EventEmitter<any> = new EventEmitter(); 
@Output() onOpenModalEditSubcategory: EventEmitter<Subcategoria> = new EventEmitter();
@Output() onOpenModalDeleteSubcategory: EventEmitter<Subcategoria> = new EventEmitter();

public subcategorias: Array<Subcategoria> = [];

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

  openModalnewSubcategory(){
      this.onOpenModalnewSubcategory.emit()
  }

  openModalEditSubcategory(subcategory: Subcategoria){
     this.onOpenModalEditSubcategory.emit(subcategory)
  }

  openModalDeleteSubcategory(subcategory: Subcategoria):void{
      this.onOpenModalDeleteSubcategory.emit(subcategory)
  }


  async onChangePage(event: any) {}


  async limpiarFiltro() {}


  async onChangeEstatus() {}

  public async onChangeGrupo() {}

  public async showSearchResults() {}

  /* -------------------------------- */

}
