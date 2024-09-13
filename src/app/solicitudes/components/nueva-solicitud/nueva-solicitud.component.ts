import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { NuevaSolicitud } from '../../modelos/NuevaSolicitud';
import { AutoCompleteService } from '../../services/auto-complete.service';
import { MensajesService } from '../../services/mensajes.service';
import { SharedataService } from '../../services/sharedata.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SubcategoriaService } from '../../services/subcategoria.service';

@Component({
	selector: 'app-nueva-solicitud',
	templateUrl: './nueva-solicitud.component.html',
	styleUrls: ['./nueva-solicitud.component.scss']
})
export class NuevaSolicitudComponent implements OnInit {

	public gruposData: any[] = []
	public categoriasData: Array<any>
	public solicitantesData: Array<any> = []
	public serviciosData: Array<any> = []
	public subcategoriasData: Array<any> = []

	public archivos: any[] = []

	public banderaGrupo: boolean = true
	public banderaUsuario: boolean = false
	public banderaServicio: boolean = false
	public banderaCategoria: boolean = false
	public banderaSubcategoria: boolean = false
	public banderaResumen: boolean = false

	public nuevaSolicitud: NuevaSolicitud = {}
	private idNuevaSolicitud: number = 0
	public pasoActual: number = 0;

	public pasos: any[] = [
		{ label: 'Grupo' },
		{ label: 'Usuario' },
		{ label: 'Servicio' },
		{ label: "Categoria" },
		{ label: "Subcategoria" },
		{ label: "Resumen" }
	]

	private idGrupo: number = 0;

	constructor(private solicitudes: SolicitudesService,
		private autoComplete: AutoCompleteService,
		private servicios: ServiciosService,
		private categorias: CategoriasService,
		private subcategorias: SubcategoriaService,
		private mensajes: MensajesService,
		private gruposService: GrupoService,
		private router: Router,
		private route: ActivatedRoute) {

		this.categoriasData = new Array()
	}

	ngOnInit(): void {
		this.gruposService.getGruposByUsuario()
			.then(async grupos => {
				this.gruposData = grupos

				this.route.queryParams.subscribe(queryParams => {
					if (queryParams.grupo) {
						this.nuevaSolicitud.idGrupo = queryParams.grupo
						this.pasoActual++
					}
				})

			})
			.catch(error => {
				console.log(error)
				this.mensajes.printToast("error", "Nueva Solicitud", "Hubo un error inesperado, intente mas tarde")
			})

	}

	public async altaSolicitud() {

		try {
			this.idNuevaSolicitud = await this.solicitudes.altaSolicitud(this.nuevaSolicitud)
			this.nuevaSolicitud = {}
			this.pasoActual = 0
			this.mensajes.printToast("success", "Solicitudes", "Solicitud creada exitosamente.")

			for (let archivo of this.archivos)
				if (!(await this.solicitudes.adjuntarArchivo(archivo, this.idNuevaSolicitud)))
					this.mensajes.printToast("error", "Adjuntar archivos", "Error adjuntando el archivo, intente una vez mas")

			this.router.navigate(["solicitudes", "listado"])
		} catch (ex) {
			console.log(ex)
			this.mensajes.printToast("error", "Solicitudes", "Error levantando la solicitud, intente de nuevo")
		}

	}

	public async onChangeGrupoNuevaSolicitud() {
		try {
			if (this.nuevaSolicitud.idGrupo > 0) {
				this.solicitantesData = await this.autoComplete.autoCompleteSolicitante(this.nuevaSolicitud.idGrupo, "")
				this.serviciosData = await this.servicios.getServicios(this.nuevaSolicitud.idGrupo, "", 0, "", "")
				this.pasoActual++
				this.banderaGrupo = false
				this.banderaUsuario = true
			}
		} catch (error) {
			console.log(error)
		}
	}

	public onChangeUsuarioNuevaSolicitud() {
		this.banderaUsuario = false
		this.banderaServicio = true
		this.pasoActual++
	}

	public async onChangeServicioNuevaSolicitud() {
		try {
			if (this.nuevaSolicitud.idServicio > 0) {
				this.categoriasData = await this.categorias.getCategorias(this.nuevaSolicitud.idServicio, this.nuevaSolicitud.idGrupo, "", 1, 0)
				this.pasoActual++
				this.banderaServicio = false
				this.banderaCategoria = true
			}
		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeCategoriaNuevaSolicitud() {
		try {
			if (this.nuevaSolicitud.idCategoria > 0) {
				this.subcategoriasData = await this.subcategorias.getSubcategorias(this.nuevaSolicitud.idCategoria, 0)
				this.banderaCategoria = false
				this.banderaSubcategoria = true
				this.pasoActual++
			}
		} catch (error) {
			console.log(error)
		}
	}

	public onChangeSubcategoriaNuevaSolicitud() {
		this.banderaSubcategoria = false
		this.banderaResumen = true
		this.pasoActual++
	}

	public onFileChange(evento: any) {
		if (evento.currentFiles) {
			this.archivos = evento.currentFiles
		} else {
			let tempArray = []
			for (let archivo of this.archivos)
				if (archivo != evento.file)
					tempArray.push(archivo)

			this.archivos = tempArray
		}

	}

	public cambiarPaso() {
		console.log(this.nuevaSolicitud)
		if(this.pasoActual > 0 && !this.nuevaSolicitud.idGrupo){
			this.mensajes.printToast("warn", "Nueva Solicitud", "Selecciona primero un grupo")
			this.pasoActual = 0
		}
		else if( this.pasoActual > 1  && !this.nuevaSolicitud.idNotificador){
			this.mensajes.printToast("warn", "Nueva Solicitud", "selecciona un notificador primero")
			this.pasoActual = 1
		}
		else if( this.pasoActual > 2 && this.nuevaSolicitud.idServicio){
			this.mensajes.printToast("warn", "Nueva Solicitud", "Selecciona primero un servicio")
			this.pasoActual = 2
		}
		else if( this.pasoActual > 3 && this.nuevaSolicitud.idCategoria){
			this.mensajes.printToast("warn", "Nueva SOlicitud", "Seleccione una categoria primero")
			this.pasoActual = 3
		}
	}

	public cerrar() {
		this.nuevaSolicitud = {}
		this.pasoActual = 0
		this.archivos = []
		let ruta: string[] = this.idGrupo ? ["listado"] : ["solicitudes", "listado"]
		this.router.navigate(ruta)
	}

}
