import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import Seccion from 'src/app/servicios/modelos/Seccion';
import Formulario from 'src/app/servicios/modelos/Seccion';
import { QuestionService } from '../../services/pregunta.service';
import { sectionService } from '../../services/seccion.service';
import Swal from 'sweetalert2';
import Servicio from 'src/app/servicios/modelos/Servicio';

@Component({
  selector:    'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: [ './formulario.component.scss']
})
export class FormularioComponent implements OnInit {

   @Input()  editCategory: Categoria = {}
   @Input()  editService: Servicio = {}
   
   @Output() onUpdateArraySubcategories: EventEmitter<Seccion[]> = new EventEmitter()

   public editSection : Seccion = {}  
   public sections: Array<Seccion> = []
   public estatusList: number[] = []

   public submittedSections: boolean = true
   public submittedAdd: boolean = false
   public submittedEdit: boolean = false
   public seccionDialogAdd: boolean = false;
   public seccionDialogEdit: boolean = false;


   constructor(private serviceQuestion: QuestionService,
               private serviceSection: sectionService ) {}

  ngOnInit(): void {
     this.submittedSections = true;
  }

  openModalAdd(){

    this.submittedAdd = true;
    this.seccionDialogAdd = true;

  }

  openModalEditSection(section: Seccion){
    
     this.editSection = section;
     this.submittedEdit = true;
     this.seccionDialogEdit = true;
     this.submittedSections = false;

  }

  closeModalNewSection(){
    this.submittedAdd = false
    this.seccionDialogAdd = false
  }
 
   
  closeModalEditSection(){
      this.submittedEdit = false;
      this.seccionDialogEdit = false;
      this.submittedSections = true;
  }


  addSection(newSection: Seccion){


      newSection.categoria = this.editCategory.id;
      newSection.servicio =  this.editService.id;

      this.serviceSection
           .addSection(newSection)
           .subscribe( 
                section =>
                this.sections.push(section)
          )

      this.closeModalNewSection();
  }

  openModalDeleteSection(section: Seccion){

    Swal.fire({
      title: 'Eliminar categoria',
      text: '¿Esta seguro que desea eliminar la categoría:' + section.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
   }).then( result => {

            this.serviceSection.deleteSection(section.id?section.id:0)
                .subscribe(res=>{
                      this.sections = this.sections.filter(h => h !== section);
                });
              Swal.fire('Eliminado', 'Se ha eliminado la categoria: ', 'success');
        });
  }


  updateSection(section: Seccion){
   
    this.serviceSection.updateSection(section)
    .subscribe(section => {
       const ix = section ? this.sections.findIndex(h => h.id === section.id) : -1;
          if (ix > -1) {
           this.sections[ix]= section;
          }
    });


    // const ix = section ? this.sections.findIndex(h => h.id === section.id) : -1;
    // if (ix > -1) {
    //     this.sections[ix]= section;
    // }
    
    
    this.editSection = {};
    this.closeModalEditSection();
     
  }






}
