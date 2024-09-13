import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Pregunta from 'src/app/servicios/modelos/Pregunta';
import Seccion from 'src/app/servicios/modelos/Seccion';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.scss']
})
export class NuevaPreguntaComponent implements OnInit {


  @Input() editSection: Seccion = {};
  @Output() onAddQuestion: EventEmitter<Seccion> = new EventEmitter();
  newQuestion: Pregunta = {}
  options : Array<any> = [];
  selectOption = 0
  selectPregunta = ""
  validationService: FormGroup;

  constructor(private fb: FormBuilder) { 

    this.validationService = this.fb.group({
      texto: [""],
      si_no: [""]
    }); 

  }


  ngOnInit(): void {
    this.options= [
       { type: 'Texto', id: 1 },
       { type: 'Pregunta Sí/No', id: 2 },
       { type: 'Pregunta de opción multiple', id: 3 },
       { type: 'Campo numerico ', id: 4},
       { type: 'Campo de fecha', id: 5}
    ]
  }

  addQuestion(){
    this.onAddQuestion.emit(this.newQuestion)
  }

  onChangeQuestion(event: any){
    this.selectOption = event.itemValue;
  }

}
