import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Contacto from 'src/app/servicios/modelos/Contacto';

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.component.html',
  styleUrls: ['./nuevo-contacto.component.scss']
})
export class NuevoContactoComponent implements OnInit {
 
  public newContact: Contacto = {}
  validationService: FormGroup ;
  @Output() onAddContact: EventEmitter<Contacto> = new EventEmitter()
  @Output() onCloseModalnewContact: EventEmitter<any> = new EventEmitter()

  constructor(private fb: FormBuilder) { 

    this.validationService = this.fb.group({
			nombre: ["", Validators.compose( [Validators.required])],                  
			puesto: [""],
			correo: [""],
			telefono: [""],
	     });
  }

  ngOnInit(): void {
  }

  cancel(): void {
       this.newContact = {}
      this.onCloseModalnewContact.emit()
  }

  saveContact(): void{
    if (this.validationService.invalid) {
			return Object.values( this.validationService.controls).forEach( control => {
			   control.markAsTouched();
		   });
		 }else{
           this.onAddContact.emit(this.newContact)
           this.newContact = {}
		 }
  }

  get invalidContact() {
     return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
 }

}
