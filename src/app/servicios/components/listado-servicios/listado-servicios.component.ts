import { Component, OnInit } from '@angular/core';
// import Servicios from 'src/app/core/interfaces/Servicios';
import  Servicio from 'src/app/servicios/modelos/Servicio';
import { MenuItem } from 'primeng/api';
import { ServiciosService } from '../../services/servicios.service';
import Sort from 'src/app/core/interfaces/Sort';
import TipoFecha from 'src/app/core/interfaces/TipoFecha';
import { AutoCompleteService } from '../../services/auto-complete.service';
import { Table } from 'primeng/table'
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-listado-servicios',
	templateUrl: './listado-servicios.component.html',
	// styleUrls: ['./listado-servicios.component.scss']
	
})
export class ListadoServiciosComponent implements OnInit {
	@ViewChild('dt') dt: Table | undefined;
	items: MenuItem[];
	
	public listServicios: Array<Servicio>
	private sort: Sort
	private tipoFecha: TipoFecha
	private filtro: Servicio
	private servicio: Servicio;
	private servicioDialog: boolean;
	public busqueda: string;
	public banderaNuevoServicio: boolean = false;
	public grupos: any[] = [];
	public estatusList: number[];
	public tipo: number[]
	public grupo: number[]
	public status: any[] = [
		{ name: "Activo", value: 2 },
		{ name: "Desarrollo", value: 1 },
		{ name: "Retirado", value: 3 }
	]

	public tipoData: any[] = [
		{ name: "De cara al usuario", value: 1 },
		{ name: "De soporte interno", value: 2 },
		{ name: "Monitoreo", value: 3 },
	]

	opcionMenu: number;


	constructor(private servicios: ServiciosService, 
		        private autoComplete: AutoCompleteService,
				private router: Router	
				) {

		this.sort = {
			sort: "id",
			sorting: 1,
			pagina: 0
		}
		this.tipoFecha = {}
		this.busqueda = ""
		this.filtro = {}
		this.servicio = {}
		this.servicioDialog = true;

		this.estatusList = []
		this.tipo = []
		this.grupo = []
		this.items = []
		this.opcionMenu = 1;
		this.listServicios = []
	}

	ngOnInit(): void {

		 this.servicios.getServicios(this.sort, {}, this.tipoFecha, this.busqueda, 1)
			.then(
				data => 
				    this.listServicios = this.servicios.listServices = data

		    )
		.catch(error => console.log(error))

		//this.listServicios = this.servicios.listServices
		 this.getGrupos();
	}

	async getServicios(): Promise<void> {

		return new Promise(async (resolve, reject) => {

			try {
				this.servicios.listServices = await this.servicios.getServicios(this.sort, {}, this.tipoFecha, this.busqueda, 1)
				resolve()
			} catch (error) {
				reject(error)
			}

		})
	}

	async onChangePage(event: any) {
		console.log(event)
		this.sort.pagina = event?.page
		try {
			await this.getServicios()
		} catch (error) {
			console.log(error)
		}
	}

	editServicio(service: Servicio) {
		     this.servicios.edit(service)
		     this.router.navigate(['servicios/editar']);
	}

	deleteServicio(service: Servicio) {

		Swal.fire({
			title: 'Eliminar servicio',
			text: '¿Esta seguro que desea eliminar el servicio:' + service.nombre + '?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'Cancelar'
		 }).then( result => {
	  
		    if (result.value){

				  this.servicios.delete(service.id?service.id:0).subscribe(res=>{
				  this.servicios.listServices = this.servicios.listServices.filter(h => h !== service);
					   Swal.fire('Eliminado', 'El servicio se elimino con exito:', 'success');
			      })
               
				// this.servicios.listServices = this.servicios.listServices.filter(h => h !== service);

		     }
		   });
	}

	btnClickNuevoServicio() {
		//  this.router.navigate(['/user']);
		console.log("ENTRE NUEVO SERVICIO: ");
	}

	async getGrupos() {
		this.grupos = await this.autoComplete.autoCompleteGrupo(1, "")
	}

	public async onChangeGrupo() {
		// try {
		// 	if (this.grupos[0] > 0) {
		// 		this.filtro.Grupo = this.grupos[0]

		// 		}
		// 	else
		// 		this.filtro.Grupo = undefined

		// 	await this.getServicios()
		// } catch (error) {
		// 	console.log(error)
		// }


	}

	

	public async onChangeEstatus() {
		try {
			console.log(this.estatusList)
			await this.getServicios()
		} catch (error) {
			console.log(error)
		}
	}

	public async onChangeTipo(evento: any) {
		// try {
		// 	this.filtro.TipoServicio= evento.value[0]!
		// 	await this.getServicios()
		// } catch (error) {
		// 	console.log(error)
		// }
	}

	public async showSearchResults() {
		// try {
		// 	console.log('busqueda: '+this.busqueda);
		// 	await this.getServicios()
		// } catch (error) {
		// 	console.log(error)
		// }
	}

	public async limpiarFiltro() {
		// try {
		// 	this.filtro = {}
		// 	this.sort = {
		// 		sort: "id",
		// 		sorting: 1,
		// 		pagina: 0
		// 	}
		// 	this.tipoFecha = {}

		// 	this.grupo = []
		// 	this.estatusList = []
		// 		this.tipo = []
		// 	await this.getServicios()
		// } catch (error) {
		// 	console.log()
		// }
	}

	getEventValue($event:any) :string {
		 return $event.target.value;
   } 

}
