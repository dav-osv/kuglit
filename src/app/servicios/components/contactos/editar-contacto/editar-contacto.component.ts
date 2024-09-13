import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Contacto from 'src/app/servicios/modelos/Contacto';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.scss']
})
export class EditarContactoComponent implements OnInit {
  
  @Input() editContact: Contacto = {}
  validationService: FormGroup ;

  @Output() onUpdateContact: EventEmitter<Contacto> = new EventEmitter()
  @Output() onCloseModalEditContact: EventEmitter<any> = new EventEmitter()

  constructor(private fb: FormBuilder) {
     this.validationService = this.fb.group({
		 	 nombre: [""],                   
			 puesto: [""],
			 correo: [""],
			 telefono: [""],
	    });
  }

  ngOnInit(): void {
  }

  cancel(): void {
     this.onCloseModalEditContact.emit()
  }


  updateContact(): void{
    if (this.validationService.invalid) {
			return Object.values( this.validationService.controls).forEach( control => {
			   control.markAsTouched();
		   });
		 }else{
           this.onUpdateContact.emit(this.editContact)
		 }
  }

  get invalidContact() {
    return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
 }


}
