import { AfterViewInit, Component, Input, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { MensajesService } from 'src/app/solicitudes/services/mensajes.service';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  public idGrupo = 0;
  public configuracionesGrupo: any = {}
  public usuariosGrupo: any[] = []
  
  public usuariosCorreoSelected: any[] = []
  public usuariosCalificacionSelected: any[] = []

  public usuariosCorreoDisplay: any[] = []
  public usuariosCalificacionDisplay: any[] = []

  public visibleCorreos: boolean = true
  public visibleCalificaciones: boolean = true
  public modalCorreosSLA: boolean = false
  public banderaEditarCorreo: boolean = false
  private indiceCorreo: number = -1

  public nombre: string = ""
  public correo: string = ""

  public correosSLA: any[] = []
  constructor(
    private route: ActivatedRoute,
    private configuracionService: ConfiguracionService,
    private grupoService: GrupoService,
    private mensajes: MensajesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( async params => {
      if (params.has('id')) {
        this.idGrupo = Number.parseInt(params.get('id') || '0');

        try {
          this.usuariosGrupo = await this.grupoService.getUsuariosByGrupo( this.idGrupo, "")
          this.configuracionesGrupo = await this.configuracionService.getDetalle(this.idGrupo).toPromise()
          console.log(this.configuracionesGrupo)

          this.usuariosCalificacionSelected = this.configuracionesGrupo.idsUEmpresaCalificacionList ?? []
          
          this.usuariosCalificacionDisplay = this.getDisplayUsers(this.usuariosCalificacionSelected)
          this.correosSLA = (await this.grupoService.getCorreoSLA( this.idGrupo )).listUsuarioCorreo
          
        } catch (error) {
          console.log(error)
          this.mensajes.printToast("error", "Configuracion", "Error obteniendo la configuración del grupo")
        }

      } else {
        this.mensajes.printToast("error", "Configuracion", "Error obteniendo la configuracion del grupo (datos ambiguos)")
      }
    });
  }

  public getDisplayUsers(idsSeleccionados: any[]): any[] {
    let usuariosSelect: any[] = []
    for( const id of idsSeleccionados)
      for(const usuario of this.usuariosGrupo)
        if(usuario.idUsuarioE == id){
          usuariosSelect.push(usuario)
          break
        }

    return usuariosSelect
  }

  async onChangeSelectUsuariosCorreo() {

    try {
      const result = await this.configuracionService.actualizarUsuariosSLA(this.idGrupo, this.usuariosCorreoSelected)
      console.log(result)
      this.mensajes.printToast("success", "Actualizar configuracion", "Usuarios actualizados correctamente")
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Actualizar usuarios", "Error actualizando a los usuarios, intente mas tarde")
    }

    this.usuariosCorreoDisplay = this.getDisplayUsers(this.usuariosCorreoSelected)
  }

  async onDeleteUsuarioCorreo(indice: number, usuarioEmpresa: number) {

    this.usuariosCorreoDisplay.splice(indice, 1)

    try {
      for(let i = 0; i < this.usuariosCorreoSelected.length; i++)
      if( this.usuariosCorreoSelected[i] == usuarioEmpresa){
        this.usuariosCorreoSelected.splice(i, 1)
        this.visibleCorreos = false
        const result = await this.configuracionService.actualizarUsuariosSLA(this.idGrupo, this.usuariosCorreoSelected)
        setTimeout( ()=> { this.visibleCorreos = true }, 0)
        break
      }
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Actualizar usuarios", "Error actualizando a los usuarios, intente mas tarde")
    }
    
  }

  async onChangeSelectUsuariosCalificacion() {
    try {
      
      this.configuracionesGrupo.idsUEmpresaCalificacionList = this.usuariosCalificacionSelected
      const result = await this.configuracionService.actualizarConfiguracion(this.configuracionesGrupo)
      console.log(result)
      this.mensajes.printToast("success", "Actualizar configuracion", "Configuracion actualizada correctamente")
    } catch (error) {
      console.log(error)
    }

    this.usuariosCalificacionDisplay = this.getDisplayUsers(this.usuariosCalificacionSelected)
  }

  async onDeleteUsuarioCalificacion(indice: number, usuarioEmpresa: number) {
    this.usuariosCalificacionDisplay.splice(indice, 1)

    try {
      for(let i = 0; i < this.usuariosCalificacionSelected.length; i++)
      if( this.usuariosCalificacionSelected[i] == usuarioEmpresa) {
        this.usuariosCalificacionSelected.splice(i, 1)
        
        this.configuracionesGrupo.idsUsuarioEmpresaCalificacionList = this.usuariosCalificacionSelected
        const result = await this.configuracionService.actualizarConfiguracion(this.configuracionesGrupo)
        console.log(result)

        this.visibleCalificaciones = false
        setTimeout( () => { this.visibleCalificaciones = true }, 0)
        this.mensajes.printToast("success", "Actualizar configuracion", "Configuracion actualizada correctamente")
        break
      }
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Actualizar configuracion", "Error actualizando la configuracion del grupo")
    }
  }

  async onAgregarCorreoSLA() {
    const correo = { nombre: this.nombre, correo: this.correo, idGrupo: this.idGrupo }
    
    try {
      if( this.banderaEditarCorreo ){
        
        const result = this.grupoService.editarCorreoSLA(correo)
        console.log(result)
        this.correosSLA[this.indiceCorreo] = correo
        this.banderaEditarCorreo = false
        this.indiceCorreo = -1
        this.mensajes.printToast("success", "Editar correo de primera respuesta", "Correo editado de manera exitosa")
      }
      else{
        await this.grupoService.agregarCorreoSLA(correo)
        this.correosSLA.push(correo)
        this.mensajes.printToast("success", "Agregar correo de primera respuesta", "Correo agregado de manera correcta")
      }
      
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Agregar correo de primera respuesta", "Error agregando el correo de primera respuesta, intente mas tarde")
    }

    this.correo = ""
    this.nombre = ""

    this.modalCorreosSLA = false
  }

  onDeleteCorreoSLA(indice: number) {
    this.mensajes.confirmDialog(`¿Esta seguro que desea eliminar '${this.correosSLA[indice].correo}' de la lista de correos SLA ? Esta accion no puede deshacerse`, async() => {
      const correo = { 
        nombre: this.correosSLA[indice].nombre,
        correo: this.correosSLA[indice].correo, 
        idGrupo: this.idGrupo 
      }
      this.grupoService.borrarCorreoSLA(correo)
      this.correosSLA.splice(indice, 1)
      this.mensajes.printToast("success", "Borrar Correo de primera respuesta", "Correo eliminado de manera correcta")
    }, (razon) => { 
      console.log(razon)
      this.mensajes.printToast("error", "Borrar correo de primera resuesta", "Error eliminando el correo de primera respuesta, intenete mas tarde")
    })
  }

  onUpdateCorreoSLA(indice: number) {
    console.log(indice)

    this.correo = this.correosSLA[indice].correo
    this.nombre = this.correosSLA[indice].nombre
    this.modalCorreosSLA = true
    this.banderaEditarCorreo = true
    this.indiceCorreo = indice
  }

  async onChangeConfiguracion() {

    try {
      await this.configuracionService.actualizarConfiguracion(this.configuracionesGrupo)
      this.mensajes.printToast("success", "Actualizar configuracion", "Configuracion actualizada correctamente")
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Actualizar configuracion", "Error actualizando la configuración del grupo, intente mas tarde")
    }
  }
}
