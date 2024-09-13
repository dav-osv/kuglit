import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import Contacto from 'src/app/servicios/modelos/Contacto';
import Servicio from 'src/app/servicios/modelos/Servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  @Input() newService: Servicio= {}
  @Input() editService: Servicio= {}

  @Output() onTemporaryService: EventEmitter<Servicio> = new EventEmitter()
  @Output() onAddService: EventEmitter<Servicio> = new EventEmitter()
  @Output() onUpdateService: EventEmitter<Servicio> = new EventEmitter()

  @Input() type: string =  ""


  public editContact : Contacto = {}
  public contacts: Array<Contacto> = []
  public submittedAdd: boolean = false
  public submittedEdit: boolean = false
  public contactDialogAdd: boolean = false;
  public contactDialogEdit: boolean = false;
   
  constructor() {
  }

  ngOnInit(): void {
    if(this.type == "newService"){
       if(this.newService.contactos){
         this.contacts = this.newService.contactos
       }  
    }else{
      if(this.editService.contactos){
          this.contacts = this.editService.contactos
      }
    }  
  }
  
  openModalnewContact(){
      this.submittedAdd = true
      this.contactDialogAdd = true
  }

  openModalEditContact(contacto: Contacto){
       this.editContact = contacto
       this.submittedEdit = true
       this.contactDialogEdit = true
  }


  closeModalnewContact(){
     this.submittedAdd = false
     this.contactDialogAdd = false
  }

    
  closeModalEditContact(){
      this.submittedEdit = false
      this.contactDialogEdit = false
  }


  addContact(contact: Contacto){
     this.contacts.push(contact)

     if(this.type == "newService"){
          this.newService.contactos = this.contacts
          this.closeModalnewContact()
          this.onTemporaryService.emit(this.newService)
     }else{
          this.editService.contactos = this.contacts
          this.closeModalnewContact()
          this.onTemporaryService.emit(this.editService)
     }
  }

  updateContact(contact : Contacto){

     const ix = contact ? this.contacts.findIndex(h => h.id === contact.id) : -1;
      if (ix > -1) {
        this.contacts[ix] = contact;
      }


    this.editContact = {};
    this.closeModalEditContact()

    if(this.type == "newService"){
         this.newService.contactos = this.contacts;
         this.onTemporaryService.emit(this.newService)
    }else{
         this.editService.contactos = this.contacts;
         this.onTemporaryService.emit(this.editService)
    }

  }

  deleteContact(contact : Contacto){

    Swal.fire({
			title: 'Eliminar contacto',
			text: '¿Esta seguro que desea eliminar el contacto:'+contact.nombre+'?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'Cancelar'
	  
		 }).then( result => {
	  
			   if(result.value){
          this.contacts = this.contacts.filter(h => h !== contact);

          if(this.type == "newService"){
              this.newService.contactos = this.contacts;
              this.onTemporaryService.emit(this.newService)
          }else{
              this.editService.contactos = this.contacts;
              this.onTemporaryService.emit(this.editService)
          }
          Swal.fire('Eliminado', 'Se ha eliminado el contacto: ', 'success');
			   }
		  })
  }

  saveService(){

      if(this.type == "newService"){
          this.onAddService.emit(this.newService)
      }else{
          this.onUpdateService.emit(this.editService)
      }

  }
}
