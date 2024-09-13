import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import Seccion from 'src/app/servicios/modelos/Seccion';
import Formulario from 'src/app/servicios/modelos/Seccion';
import { sectionService } from '../services/seccion.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.scss']
})
export class SeccionComponent implements OnInit {
  
  
  @Input() sections: Array<Seccion> = []
  
  public submittedAdd: boolean = false
  public submittedEdit: boolean = false
  public seccionDialogAdd: boolean = false;
  public seccionDialogEdit: boolean = false;

  @Output() onOpenModalEditSection: EventEmitter<Seccion> = new EventEmitter();
  @Output() onOpenModalDeleteSection: EventEmitter<Seccion> = new EventEmitter();

  // public editSubcategoria: Formulario = {} ;
  

  public secciones: Array<Formulario> = [];

  constructor() { }

  ngOnInit(): void {

  }
  
  editSection(section: Seccion){
        this.onOpenModalEditSection.emit(section);
  }

  deleteSection(section: Seccion){
       this.onOpenModalDeleteSection.emit(section);
  }

}
