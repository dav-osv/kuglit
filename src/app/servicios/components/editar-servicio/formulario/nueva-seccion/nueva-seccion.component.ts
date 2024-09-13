import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Seccion from 'src/app/servicios/modelos/Seccion';

@Component({
  selector: 'app-nueva-seccion',
  templateUrl: './nueva-seccion.component.html',
  styleUrls: ['./nueva-seccion.component.scss']
})
export class NuevaSeccionComponent implements OnInit {

 
  public validationService: FormGroup;
  newSection: Seccion= {};
  agentes: Array<any> = [];

  @Output() onClosedModalAdd:  EventEmitter<boolean> = new EventEmitter();
  @Output() onAddSection: EventEmitter<Seccion> = new EventEmitter();

  constructor(private activatedRouter: ActivatedRoute,
               private fb: FormBuilder) { 
     
       this.validationService = this.fb.group({
                  nombre :  ["", Validators.compose( [Validators.required])],
                  estatus: []
        });

  }

  ngOnInit(): void {}

  cancel(): void{}


   
  addSection(){
      this.onAddSection.emit(this.newSection)
      this.newSection = {}
  }

  get invalidSeccion() {
      return this.validationService.get('nombre')?.invalid && this.validationService.get('nombre')?.touched;
  }
}
