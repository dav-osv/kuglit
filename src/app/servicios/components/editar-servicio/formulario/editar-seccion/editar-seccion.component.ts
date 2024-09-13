import { Component, OnInit, Output,EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Pregunta from 'src/app/servicios/modelos/Pregunta';
import Seccion from 'src/app/servicios/modelos/Seccion';
import { QuestionService } from '../services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-seccion',
  templateUrl: './editar-seccion.component.html',
  styleUrls: ['./editar-seccion.component.scss']
})
export class EditarSeccionComponent implements OnInit {

  public validationService: FormGroup;
  public visibleQuestion: boolean = false;
  public visibleButtonQuestion: boolean = false;
  public questions: Array<Pregunta> = []

  @Input()  editSection: Seccion = {};
  @Output() onClosedModalEdit:  EventEmitter<boolean> = new EventEmitter();
  @Output() onUpdateSection: EventEmitter<Seccion> = new EventEmitter();


  constructor(private fb: FormBuilder,private serviceQuestions: QuestionService) { 
     
       this.validationService = this.fb.group({
                  nombre :  ["", Validators.compose( [Validators.required])],
                  estatus: []
        });

  }

  ngOnInit(): void {
      this.visibleQuestion = false;
      this.visibleButtonQuestion = true;
  }

  
  cancel(): void{
      this.onClosedModalEdit.emit();
  }


   
  updateSection(){
      this.onUpdateSection.emit(this.editSection)
      this.editSection = {}
  }


  openComponentQuestion(){
       this.visibleQuestion = true;
       this.visibleButtonQuestion = false;
  }


  addQuestion(question: Pregunta){

    question.idSeccion = this.editSection.id;

    this.questions.push(question) 
    this.serviceQuestions
        .addQuestion(question)
        .subscribe(
             question => this.questions.push(question)
         )
  }


  deleteQuestion(question: Pregunta){
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Esta seguro que desea eliminar la subcategoría:'+question.pregunta+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'

   }).then( result => {

        if(result.value){

          this. serviceQuestions.deleteQuestion(question.id?question.id:0)
          .subscribe(res=>{
               this.questions = this.questions.filter(h => h !== question);
           });
           Swal.fire('Eliminado', 'Se ha eliminado la pregunta de manera correcta : ', 'success');
         }
    })
  }

  get invalidSeccion() {
      return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
  }
}
