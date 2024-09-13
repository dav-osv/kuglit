import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { NuevaSolicitud } from '../../modelos/NuevaSolicitud';
import { AutoCompleteService } from '../../services/auto-complete.service';
import { MensajesService } from '../../services/mensajes.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SubcategoriaService } from '../../services/subcategoria.service';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.scss']
})
export class DetalleSolicitudComponent implements OnInit {

  public solicitudDetalle: NuevaSolicitud = {}
  private solicitudEditada: NuevaSolicitud = {}
  private idSolicitud: number = 0

  public banderaRechazarSolicitud: boolean = false

  public adjuntos: any[] = []
  public comentario: string = ""
  public comentarios: any[] = []

  public opcion: number = 0

  public opcionesImpactoUrgencia: any[] = [
    { name: "I", value: 0 },
    { name: "II", value: 1 },
    { name: "II", value: 2 }
  ]

  private static matrizUrgenciaImpacto: any[][] = [
    ["Baja", "Normal", "Media"],
    ["Normal", "Media", "Alta"],
    ["Media", "Alta", "Critica"]
  ];


  public seleccionado: any

  public incidente: boolean = false
  public incidenteMayor: boolean = false
  public urgencia: number = 0
  public impacto: number = 0
  public descripcionCierre: string = ""
  public observaciones: string = ""
  public calificacion: number = 0

  public serviciosList: any[] = []
  public categoriasList: any[] = []
  public subcategoriasList: any = []
  public otrascategorias: any[] = []

  public agentesN1: any = []
  public agentesN2: any = []
  public agentesN3: any = []
  public activos: any = []
  public gruposSoporte: any = []

  public fechaDeNacimiento: string = ""
  public fechaRecepcion: string = ""
  public fechaModificacion: string = ""
  public servicio: number[] = []
  public categoria: number[] = []
  public subcategoria: number[] = []
  public otraCategoria: number[] = []
  public activosAfectados: number[] = []
  public grupoDeSoporte: number[] = []
  public descripcion: string = ""
  public estatus: string = ""
  public agenteN1: number[] = []
  public agenteN2: number[] = []
  public agenteN3: number[] = []
  public prioridad: string = "baja"
  public razonRechazo: string = ""

  private status: any[] = [
    "Nuevo",
    "Abierto",
    "Pendiente por cliente",
    "Pendiente por proveedor",
    "Pendiente por RFC",
    "Pendiente por solicitud",
    "Todo tipo de pendiente",
    "Calificar",
    "Personales",
    "Cerrado",
    "Rechazado",
  ]

  private tiemOutId: any
  private banderaCambio: boolean = false

  constructor(private route: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private mensajes: MensajesService,
    private servicios: ServiciosService,
    private categorias: CategoriasService,
    private subcategorias: SubcategoriaService,
    private autocomplete: AutoCompleteService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async queryparams => {
      this.idSolicitud = Number.parseInt(queryparams.id)

      try {
        this.comentarios = await this.solicitudesService.getComentarios(this.idSolicitud)
        this.solicitudDetalle = await this.solicitudesService.detalleSolicitud(this.idSolicitud)

        let partesfecha = this.solicitudDetalle.nacimiento.split("-")
        this.fechaDeNacimiento = `${partesfecha[2]} de ${partesfecha[1]} de ${partesfecha[0]}`
        this.fechaRecepcion = new Date(this.solicitudDetalle.recepcion).toLocaleString("es-mx")
        this.fechaModificacion = new Date(this.solicitudDetalle.ultimaActualizacion).toLocaleString("es-mx")
        this.categoria.push(this.solicitudDetalle.categoria)
        this.servicio.push(this.solicitudDetalle.servicio)

        if (this.solicitudDetalle.subcategoria)
          this.subcategoria.push(this.solicitudDetalle.subcategoria)

        if (this.solicitudDetalle.otraCategoria)
          this.otraCategoria.push(this.solicitudDetalle.otraCategoria)

        this.impacto = this.solicitudDetalle.impacto ?? this.impacto
        this.urgencia = this.solicitudDetalle.urgencia ?? this.urgencia

        if (this.solicitudDetalle.grupoSoporte)
          this.grupoDeSoporte.push(this.solicitudDetalle.grupoSoporte)

        this.agentesN1 = await this.autocomplete.autoCompleteAgente(this.solicitudDetalle.idGrupo, "", 1)
        if (this.solicitudDetalle.n1) {
          this.agenteN1.push(this.solicitudDetalle.n1)
          this.agenteN2 = await this.autocomplete.autoCompleteAgente(this.solicitudDetalle.idGrupo, "", 2)
        }

        if (this.solicitudDetalle.n2) {
          this.agenteN2.push(this.solicitudDetalle.n2)
          this.agentesN3 = await this.autocomplete.autoCompleteAgente(this.solicitudDetalle.idGrupo, "", 3)
        }

        if (this.solicitudDetalle.n3)
          this.agenteN3.push(this.solicitudDetalle.n3)

        this.estatus = this.status[this.solicitudDetalle.estatus!]
        this.descripcion = this.solicitudDetalle.descripcion ?? ""

        this.serviciosList = await this.servicios.getServicios(this.solicitudDetalle.idGrupo, "", 0, "", "")
        this.categoriasList = await this.categorias.getCategorias(this.solicitudDetalle.servicio, this.solicitudDetalle.idGrupo, "", 1, 0)
        this.subcategoriasList = await this.subcategorias.getSubcategorias(this.solicitudDetalle.categoria, 0)
        this.otrascategorias = await this.categorias.getOtrascategorias(this.solicitudDetalle.idGrupo)

        this.incidente = !this.solicitudDetalle.incidente
        this.incidenteMayor = this.solicitudDetalle.incidenteMayor != undefined && this.solicitudDetalle.incidenteMayor != 0

        this.prioridad = DetalleSolicitudComponent.matrizUrgenciaImpacto[this.solicitudDetalle.urgencia!][this.solicitudDetalle.impacto!]

      } catch (error) {
        console.log(error)
      }
    })
  }

  public onFileChange(evento: any) {
    if (evento.currentFiles) {
      this.adjuntos = evento.currentFiles
    } else {
      let tempArray = []
      for (let archivo of this.adjuntos)
        if (archivo != evento.file)
          tempArray.push(archivo)

      this.adjuntos = tempArray
    }

  }

  public async onAgregarSeguimiento() {
    try {
      console.log(this.comentario.length > 0)
      await this.solicitudesService.agregarComentario(this.idSolicitud, this.comentario, this.adjuntos[0])
      this.mensajes.printToast("success", "Agregar seguimiento", "Comentario agregado correctamente")
      this.comentario = ""
      this.comentarios = await this.solicitudesService.getComentarios(this.idSolicitud)
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Agregar seguimiento", "Error agregando comentario, intente mas tarde")
    }
  }

  public onChange(event: any, propiedad: string) {

    if (typeof event.value == "object") {
      // el evento fue disparado por un select

      /**
       * el evento fue disparado por el select de activos afectados que no tiene limite en cuantos
       * items puedes seleccionar 
       */
      if (this.solicitudDetalle[propiedad] != event.value) {
        this.banderaCambio = true
        if (event.value.length > 1) {
          this.solicitudEditada[propiedad] = event.value

        }
        else { // el evento fue disparado por cualquier otro select
          this.solicitudEditada[propiedad] = event.value[0]
          if (propiedad == "n1" && this.solicitudDetalle.id == undefined)
            this.solicitudEditada[propiedad] = undefined
        }
      }

    } else if (typeof event.value == "number") {
      // el evento fue disparado por los botones de urgencia/impacto
      if (this.solicitudDetalle[propiedad] != event.value) {
        this.banderaCambio = true
        this.solicitudEditada[propiedad] = event.value
      }
    } else if (typeof event.checked == "boolean") {
      // el evento fue disparado por alguno de los botones de incidente o incidenteMayor
      if (this.solicitudDetalle[propiedad] != event.checked) {
        this.banderaCambio = true
        this.solicitudEditada[propiedad] = event.checked
      }


    }

    if (this.descripcion != this.solicitudDetalle.descripcion) {
      this.solicitudEditada.descripcion = this.descripcion
      this.banderaCambio = true
    }
    else
      this.solicitudEditada.descripcion = undefined

    let tienePropiedades = false
    for (let propiedad in this.solicitudEditada)
      if (this.solicitudEditada[propiedad]) {
        tienePropiedades = true
        break
      }

    // si se habia detectado un cambio pero se desecho se cancela la edicion de la solicitud
    if (this.banderaCambio && !tienePropiedades) {
      this.banderaCambio = false
    }

    // si no se han detectado cambios en la solicitud se limpia (en caso de existir)
    // el timeout para guardar los cambios
    if (!this.banderaCambio)
      clearTimeout(this.tiemOutId)
    else
      this.tiemOutId = setTimeout(async () => {
        try {
          await this.solicitudesService.guardarCambios(this.idSolicitud, this.solicitudEditada)
          this.mensajes.printToast("success", "Editar solicitud", "Solicitud actualizada correctamente")
          this.solicitudDetalle = {}
        } catch (error) {
          console.log(error)
          this.mensajes.printToast("error", "Editar solicitud", "Error actualizando la solicitud, intente mas tarde")
        }
      }, 5000)
  }

  public async aceptarSolicitud() {
    console.log("lkajdci")
    try {
      if (this.agenteN1.length == 0)
        this.mensajes.printToast("info", "Aceptar solicitud", "Debe seleccionar un agente para aceptar la solicitud")
      else {
        console.log("1")
        let idAux = await this.solicitudesService.aceptarSolicitud(this.idSolicitud, this.agenteN1[0])
        console.log(2)
        this.mensajes.printToast("success", "Aceptar solicitud", "solicitud creada exitosamente con el id " + idAux)
        console.log(idAux)
      }
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Aceptar Solicitud", "Error creando la solicitud, intente mas tarde")
    }
  }

  public async rechazarSolicitud() {
    try {
      await this.solicitudesService.rechazarSolicitud(this.idSolicitud, this.razonRechazo)
      this.mensajes.printToast("success", "Rechazar solicitud", "Solicitud rechazada correctamente")
      this.banderaRechazarSolicitud = false
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Rechazar solicitud", "Error rechazando la solicitud, intente mas tarde")
    }

  }

  public async cerrarSolicitud() {
    try {
      await this.solicitudesService.cerrarSolicitud(this.idSolicitud, this.descripcionCierre, this.observaciones)
      this.mensajes.printToast("success", "Cierre de solicitud", "Solicitud cerrada exitosamente")
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Cerrar Solicitud", "Error cerrando la solicitud, intente mas tarde")
    }
  }

  public async calificarSolicitud() {
    try {
      await this.solicitudesService.calificarSolicitud(this.idSolicitud, this.calificacion)
      this.mensajes.printToast("success", "CalificarSolicitud", "Solicitud calificada correctamente")
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Calificar Solicitud", "Error calificando la solicitud, intente mas tarde")
    }
  }

  private isEqual(): boolean {
    return true
  }
}
