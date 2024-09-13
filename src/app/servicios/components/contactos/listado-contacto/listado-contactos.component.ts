import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Contacto from 'src/app/servicios/modelos/Contacto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-contactos',
  templateUrl: './listado-contactos.component.html',
  styleUrls: ['./listado-contactos.component.scss']

})
export class ListadoContactosComponent implements OnInit {

	 @Input() contacts: Array<Contacto> = []

	 @Output() onOpenModalnewContact: EventEmitter<any> = new EventEmitter(); 
     @Output() onOpenModalEditContact: EventEmitter<Contacto> = new EventEmitter();
	 @Output() onOpenModalDeleteContact: EventEmitter<Contacto> = new EventEmitter();

	 public busqueda: string; 


    constructor(private fb: FormBuilder) {
		this.busqueda = ""
	}

    ngOnInit(): void {}

	openModalnewContact(){
        this.onOpenModalnewContact.emit()
		
	}

	openModalEditContact(contacto: Contacto){
	   	this.onOpenModalEditContact.emit(contacto)
	}


	openModalDeleteContact(contacto: Contacto){
		  this.onOpenModalDeleteContact.emit(contacto) 
    }

	async onChangePage(event: any) {}
	async limpiarFiltro() {}
	public async showSearchResults() {}
}

