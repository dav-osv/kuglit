import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Solicitud from 'src/app/core/interfaces/Solicitud';
import Sort from 'src/app/core/interfaces/Sort';
import TipoFecha from 'src/app/core/interfaces/TipoFecha';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { AutoCompleteService } from '../../services/auto-complete.service';
import { MensajesService } from '../../services/mensajes.service';
import { SharedataService } from '../../services/sharedata.service';
import { SolicitudesService } from '../../services/solicitudes.service';
@Component({
	selector: 'app-listado-solicitudes',
	templateUrl: './listado-solicitudes.component.html',
	styleUrls: ['./listado-solicitudes.component.scss']
})
export class ListadoSolicitudesComponent implements OnInit {

	public solicitudesData: Array<Solicitud>
	public sort: Sort
	private tipoFecha: TipoFecha
	private filtro: Solicitud

	public gruposData: Array<any>
	public agentesData: Array<any>
	public solicitantesData: Array<any>
	public serviciosData: Array<any>
	public cambiosData: Array<any>
	public problemasData: Array<any>
	public categoriasData: Array<any>

	public tipoDeFecha: number
	public prioridad: number[]
	public busqueda: string
	public rangoDeFechas!: Date[];
	public agente: number[]
	public solicitante: number[]
	public servicio: number[]
	public cambio: number // por implementar
	public problema: number // por implementar
	public tipo: number[]
	public grupo: number[]
	public estatus: number[]
	public estatusList: number[]
	public estatusString: string = ""

	public opcionFechaSeleccionada: any
	public fechaMaxima: Date = new Date()

	public banderaEspecificarFecha: boolean = false
	public banderaFiltrado: boolean = false

	public totalSolicitudes: number = 0
	public solicitudDetalle: any = {}
	public rows: number = 10

	public prioridades: any[] = [
		{ name: "Critica", value: 0 },
		{ name: "Alta", value: 1 },
		{ name: "Mediana", value: 2 },
		{ name: "Normal", value: 3 },
		{ name: "baja", value: 4 },
	]

	public status: any[] = [
		{ name: "Nuevo", value: 0 },
		{ name: "Abierto", value: 1 },
		{ name: "Pendiente por cliente", value: 2 },
		{ name: "Pendiente por proveedor", value: 3 },
		{ name: "Pendiente por RFC", value: 4 },
		{ name: "Pendiente por solicitud", value: 5 },
		{ name: "Todo tipo de pendiente", value: 6 },
		{ name: "Calificar", value: 7 },
		{ name: "Personales", value: 8 },
		{ name: "Cerrado", value: 9 },
		{ name: "Rechazado", value: 10 },
	]

	public tiposDeFechas: any[] = [
		{
			name: "Fecha de recepcion", value: [
				{ name: "Hoy", value: 0 },
				{ name: "Ultimos 8 días", value: 1 },
				{ name: "Ultimos 15 días", value: 2 },
				{ name: "Ultimos 30 días", value: 3 },
				{ name: "Especificar", value: 4 },
			]
		},
		{
			name: "Fecha de inicio", value: [
				{ name: "Hoy", value: 5 },
				{ name: "Ultimos 8 días", value: 6 },
				{ name: "Ultimos 15 días", value: 7 },
				{ name: "Ultimos 30 días", value: 8 },
				{ name: "Especificar", value: 9 },
			]
		},
		{
			name: "fecha de cierre", value: [
				{ name: "Hoy", value: 10 },
				{ name: "Ultimos 8 días", value: 11 },
				{ name: "Ultimos 15 días", value: 12 },
				{ name: "Ultimos 30 días", value: 13 },
				{ name: "Especificar", value: 14 },
			]
		},
		{
			name: "Fecha de modificacion", value: [
				{ name: "Hoy", value: 15 },
				{ name: "Ultimos 8 días", value: 16 },
				{ name: "Ultimos 15 días", value: 17 },
				{ name: "Ultimos 30 días", value: 18 },
				{ name: "Especificar", value: 19 },
			]
		},
		{
			name: "Fecha de pendiente", value: [
				{ name: "Hoy", value: 20 },
				{ name: "Ultimos 8 días", value: 21 },
				{ name: "Ultimos 15 días", value: 22 },
				{ name: "Ultimos 30 días", value: 23 },
				{ name: "Especificar", value: 24 },
			]
		},
		{
			name: "Fecha de calificacion", value: [
				{ name: "Hoy", value: 25 },
				{ name: "Ultimos 8 días", value: 26 },
				{ name: "Ultimos 15 días", value: 27 },
				{ name: "Ultimos 30 días", value: 28 },
				{ name: "Especificar", value: 29 },
			]
		},
		{
			name: "Todas las fechas", value: [
				{ name: "Hoy", value: 30 },
				{ name: "Ultimos 8 días", value: 31 },
				{ name: "Ultimos 15 días", value: 32 },
				{ name: "Ultimos 30 días", value: 33 },
				{ name: "Especificar", value: 34 },
			]
		},
	]

	public tipoData: any[] = [
		{ name: "Solicitud", value: 0 },
		{ name: "Incidente", value: 1 },
	]

	public rutas: any[] = [
		{ name: "Todas", value: [-1], total: 0 },
		{ name: "Nuevas", value: [0], total: 0 },
		{ name: "Abiertas", value: [1], total: 0 },
		{ name: "Pendientes", value: [ 2, 4, 5, 6], total: 0 },
		{ name: "Calificar", value: [ 3 ], total: 0 },
		{ name: "Personales", value: [ 1, 2, 4, 5, 6 ], total: 0},
	]

	public totales: any = {
		Todas: 0,
		Nuevas: 0,
		Abiertas: 0,
		Pendientes: 0,
		Calificar: 0,
		Personales: 0
	}

	constructor(private solicitudes: SolicitudesService,
		private grupos: GrupoService,
		private autoComplete: AutoCompleteService,
		private servicios: ServiciosService,
		private mensajesService: MensajesService,
		private shareData: SharedataService,
		private router: Router
	) {

		this.solicitudesData = new Array<Solicitud>()
		this.gruposData = new Array<any>()
		this.agentesData = new Array<any>()
		this.solicitantesData = new Array<any>()
		this.serviciosData = new Array<any>()
		this.cambiosData = new Array<any>()
		this.problemasData = new Array<any>()
		this.categoriasData = new Array<any>()

		this.sort = {
			sort: "id",
			sorting: 1,
			pagina: 0
		}
		this.tipoFecha = {}
		this.busqueda = ""
		this.filtro = {}

		this.tipoDeFecha = 0
		this.prioridad = []

		this.solicitante = []
		this.agente = []
		this.servicio = []
		this.cambio = 0
		this.problema = 0
		this.tipo = []
		this.estatus = [-1]
		this.estatusList = []
		this.grupo = []
	}

	ngOnInit(): void {
		this.solicitudes.getSolicitudes(this.sort, {}, this.tipoFecha, this.busqueda)
			.then(solicitudes => {
				this.solicitudesData = solicitudes
				console.log(solicitudes)
			})
			.catch(error => console.log(error))

		this.grupos.getGruposByUsuario()
			.then(grupos => {
				this.gruposData = grupos
				this.shareData.setGrupos(grupos)
			})
			.catch(error => console.log(error))

		this.solicitudes.getTotales({}, this.tipoFecha, this.busqueda)
			.then(totales => {
				this.totales = totales
				this.totalSolicitudes = totales.totales
			})
			.catch(error => console.log(error))
	}

	public async onChangePage(event: any) {
		console.log(event)
		this.sort.pagina = event?.page
		try {
			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}
	}

	public async onClickSolicitud(target: any) {
			this.router.navigate(["solicitudes", "detalleSolicitud"], {
			queryParams: {
				id: target.data.id,
			}
		})
		this.shareData.setDetalleSolicitud(target.data)
	}

	public async onChangeGrupo() {
		try {
			if (this.grupo[0] > 0) {
				this.filtro.Grupo = this.grupo[0]

				this.solicitantesData = await this.autoComplete.autoCompleteSolicitante(this.grupo[0], "")
				this.serviciosData = await this.servicios.getServicios(this.grupo[0], "", 0, "", "")
				this.agentesData = await this.autoComplete.autoCompleteAgente(this.grupo[0], "");
			}
			else
				this.filtro.Grupo = undefined

			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}


	}

	public async onChangePrioridad(target: any) {
		try {
			console.log(this.prioridad)
			if (target.value[0] > 0)
				this.filtro.Prioridad = target.value[0]
			else
				this.filtro.Prioridad = undefined
			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeEstatus() {
		try {
			console.log(this.estatus)
			console.log(this.estatusList)
			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeEstatusButtons() {
		try {
			console.log(this.estatus)
			console.log(this.estatusList)
			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeAgente(event: any) {
		try {
			this.filtro.Agente = event.value[0]!
			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeTipo(evento: any) {
		try {
			this.filtro.Tipo = evento.value[0]!
			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeServicio(event: any) {
		try {
			this.filtro.Servicio = event.value[0]!
			await this.getSolicitudes()
		} catch (error) {
			console.error(error);
		}
	}

	public async onChangePeriodoFecha() {
		try {
			let valor = this.opcionFechaSeleccionada.value
			this.banderaEspecificarFecha = ((this.opcionFechaSeleccionada.value + 1) % 5) == 0

			if (valor <= 4)
				this.filtro.tipoFecha = 0

			if (valor <= 9 && valor > 4)
				this.filtro.tipoFecha = 1

			if (valor <= 14 && valor > 9)
				this.filtro.tipoFecha = 2

			if (valor <= 19 && valor > 14)
				this.filtro.tipoFecha = 3

			if (valor <= 24 && valor > 19)
				this.filtro.tipoFecha = 4

			if (valor <= 29 && valor > 24)
				this.filtro.tipoFecha = 5

			if (valor <= 34 && valor > 29)
				this.filtro.tipoFecha = 6

			if (!this.banderaEspecificarFecha) {

				if (valor == 0 || valor == 5 || valor == 10 || valor == 15 || valor == 20 || valor == 25 || valor == 30) {
					this.tipoFecha.inicio = this.tipoFecha.fin = 1
				}

				if (valor == 1 || valor == 6 || valor == 11 || valor == 16 || valor == 21 || valor == 26 || valor == 31) {
					let fecha = new Date()
					this.tipoFecha.fin = fecha.getTime()
					let fechaInicio = new Date(fecha.getTime() - 1000 * 60 * 60 * 24 * 8)
					this.tipoFecha.inicio = fechaInicio.getTime()
				}

				if (valor == 2 || valor == 7 || valor == 12 || valor == 17 || valor == 22 || valor == 27 || valor == 32) {
					let fecha = new Date()
					this.tipoFecha.fin = fecha.getTime()
					let fechaInicio = new Date(fecha.getTime() - 1000 * 60 * 60 * 24 * 15)
					this.tipoFecha.inicio = fechaInicio.getTime()
				}

				if (valor == 3 || valor == 8 || valor == 13 || valor == 18 || valor == 23 || valor == 28 || valor == 33) {
					let fecha = new Date()
					this.tipoFecha.fin = fecha.getTime()
					let fechaInicio = new Date(fecha.getTime() - 1000 * 60 * 60 * 24 * 30)
					this.tipoFecha.inicio = fechaInicio.getTime()
				}
				//<div>

				await this.getSolicitudes()
			} else
				console.log("se especificara la fecha")

		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeRangoDeFechas() {
		if (this.rangoDeFechas[0] && this.rangoDeFechas[1]) {
			this.banderaEspecificarFecha = false
			this.tipoFecha.inicio = this.rangoDeFechas[0].getTime()
			this.tipoFecha.fin = this.rangoDeFechas[1].getTime()

			try {
				await this.getSolicitudes()
			} catch (error) {
				console.log(error)
			}
		} else
			console.log("aun no")
	}

	public async onChangeSolicitante(event: any) {
		try {
			this.filtro.Solicitante = event.value
			await this.getSolicitudes()
		} catch (error) {
			console.log(error)
		}
	}

	public onFocusSelect() {
		if (!this.grupo[0])
			this.mensajesService.printToast("warn", "Filtrado de solicitudes", "Selecciona un grupo primero")
	}

	public getSolicitudes(): Promise<void> {

		return new Promise(async (resolve, reject) => {

			try {
				
				if(this.estatus[0] == -1)
					//No se han seleccionado estatus del select y esta seleccionado solo el boton de "todas"
					this.filtro.Estatus = undefined
				else if( this.estatusList.length == 0 && this.estatus[0] != -1){
					//No se han seleccionado estatus del select pero se selecciono un boton de estatus diferente a "todas"
					this.filtro.Estatus = this.estatus
				} else if(this.estatus[0] == -1 && this.estatusList.length > 0){
					//Se seleccionaron estatus del select y esta seleccionado el boton de "todas"
					this.filtro.Estatus = this.estatusList
				} else if( this.estatus[0] != -1 && this.estatusList.length > 0){
					this.filtro.Estatus = this.estatus
					for(let estatusCode of this.estatusList)
						if( !this.filtro.Estatus.includes(estatusCode))
							this.filtro.Estatus.push(estatusCode)
					console.log(this.filtro.Estatus)
				}

				this.solicitudesData = await this.solicitudes.getSolicitudes(this.sort, this.filtro, this.tipoFecha, this.busqueda)
				this.totales = await this.solicitudes.getTotales(this.filtro, this.tipoFecha, this.busqueda)

				resolve()
			} catch (error) {
				reject(error)
				this.mensajesService.printToast('error', "Solicitudes", 'Hubo un error al obtener las solicitudes')
			}

		})
	}

	public async limpiarFiltro() {
		try {
			this.filtro = {}
			this.sort = {
				sort: "id",
				sorting: 1,
				pagina: 0
			}
			this.tipoFecha = {}

			this.grupo = []
			this.prioridad = []
			this.estatusList = []
			this.rangoDeFechas = []
			this.opcionFechaSeleccionada = undefined
			this.agente = []
			this.solicitante = []
			this.tipo = []
			this.estatus = [-1]
			await this.getSolicitudes()
		} catch (error) {
			console.log()
		}
	}

	public async onClickDescargar() {
		console.log("descargar")

		try {
			await this.solicitudes.getCsv(this.sort, this.filtro, this.tipoFecha)
		} catch (error) {
			console.error(error);
			this.mensajesService.printToast("error", "Exportacion de solicitudes", "Error exportando las solicitudes")
		}
	}

	public getEstatus(estatus: number) {
		for(let status of this.status)
			if(status.value == estatus)
				return status.name

		return "baja"
	}
}
