import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MensajesService } from 'src/app/solicitudes/services/mensajes.service';
import { Cuestionario, OpcionSelect } from '../../interfaces/Cuestionario';

@Component({
  selector: 'app-tabla-cuestionario',
  templateUrl: './tabla-cuestionario.component.html',
  styleUrls: ['./tabla-cuestionario.component.scss'],
})
export class TablaCuestionarioComponent implements OnInit {
  @Input('dataPreguntas') preguntas: any[] = [];

  @Output("edit")
  onEdit: EventEmitter<any> = new EventEmitter()

  @Output("delete")
  onEliminar: EventEmitter<any> = new EventEmitter()

  @Output("create")
  onCrear: EventEmitter<any> = new EventEmitter()

  public selectButtonOpciones: any[] = [
    { label: "Si", value: true },
    { label: "No", value: false }
  ]

  public etiquetas: string[] = [
    "texto",
    "Booleano",
    "Fecha",
    "Select",
    "Número",
    "Correo",
    "Skype"
  ]

  public banderaModal: boolean = false
  public banderaEditar: boolean = false

  private idPregunta: number = -1
  public requerida: boolean = false
  public habilitado = true
  public tipo: number = 0
  public pregunta: string = ""
  public preguntaSeleccionada: any

  public opcionSelect: OpcionSelect[] = []
  public banderaSelect: boolean = false
  public nuevaOpcion: string = ""

  constructor(
    private mensajes: MensajesService
  ) { }

  ngOnInit(): void { }

  public onClickEditar(pregunta: Cuestionario) {

    this.banderaModal = true
    this.idPregunta = pregunta.id!
    this.pregunta = pregunta.nombreCampo
    this.habilitado = pregunta.estatus
    this.requerida = pregunta.mandatorio
    this.tipo = pregunta.tipoDato
    this.opcionSelect = pregunta.listSelect ?? []

    this.banderaEditar = true
  }

  public onClickEliminar(pregunta: any) {
    this.mensajes.confirmDialog("¿Esta seguro que quiere eliminar la pregunta seleccionada? Las respuestas se perderán", () => {
      this.onEliminar.emit(pregunta)
    }, (event) => {
      console.log(event)
    }, "", "Si", "No")

  }

  public onClickCrear() {
    let valor = {
      id: this.idPregunta,
      nombreCampo: this.pregunta,
      tipoDato: this.tipo,
      mandatorio: this.requerida,
      estatus: this.habilitado,
      listSelect: this.opcionSelect,
      posicion: this.preguntas.length,
      tipoPregunta: this.tipo == 4 ? 1 : 0,
      modulo: 0
    }
    if( this.banderaEditar)
      this.onEdit.emit(valor)
    else
      this.onCrear.emit(valor)

    this.banderaModal = false

    this.requerida = false
    this.habilitado = true
    this.tipo = 0
    this.pregunta = ""
    this.opcionSelect = []
    this.idPregunta = -1

    this.banderaEditar = false
  }

  agregarOpcion() {
    this.opcionSelect.push({
      valor: this.nuevaOpcion,
      ponderacion: 0
    })
    this.nuevaOpcion = ""
  }

  onDeleteOpcion(index: number) {
    this.opcionSelect.splice(index, 1)
  }

  onCloseModal() {
    this.banderaModal = false

    this.requerida = false
    this.habilitado = true
    this.tipo = 0
    this.pregunta = ""
    this.opcionSelect = []
    this.idPregunta = -1

    this.banderaEditar = false
  }

}
