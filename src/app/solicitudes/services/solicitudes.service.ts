import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Solicitud from 'src/app/core/interfaces/Solicitud';
import Sort from 'src/app/core/interfaces/Sort';
import TipoFecha from 'src/app/core/interfaces/TipoFecha';
import { environment } from 'src/environments/environment';
import {NuevaSolicitud} from '../modelos/NuevaSolicitud';

import * as fileSaver from "file-saver"

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private BASE_URL: string = `${environment.urlServiceDesk}/solicitudes`;

  constructor(private http: HttpClient) { }

  /**
   * async
   * @function getSolicitudes Obtiene la pagina especificada de solicitudes con el filtro especificadp
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @param {Sort} sort Especifica sobre que campo y como se ordenara (ascendente o descendente)
   * @param {Solicitud} query Especifica los valores que se deben de buscar
   * @param {TipoFecha} tipoFecha Especifica si se hara una consolta de tiempo
   * @param {string} buscar Parametro que indica si se buscara una cadena en especifico en las solicitudes
   * @returns Promesa con las solicitudes especificadas
   */
  public getSolicitudes(sort: Sort, query: Solicitud, tipoFecha: TipoFecha, buscar: string = ""): Promise<Array<Solicitud>> {
    let args: string = `${SolicitudesService.toUrlString(sort)}&${SolicitudesService.toUrlString(query)}&${SolicitudesService.toUrlString(tipoFecha)}`
    let urlPeticion = `${this.BASE_URL}/listado?${args}&buscar=${buscar}`


    return this.http.get<Array<Solicitud>>(`${urlPeticion}`)
      .toPromise()

  }

  /**
   * @async
   * @function getCsv Obtiene la representacion en csv de las solicitudes con el filtrado especificado para la pagina especificada
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @param {Sort} sort Especifica sobre que campo y como se ordenara (ascendente o descendente)
   * @param {Solicitud} query Especifica los valores que se deben de buscar
   * @param {TipoFecha} tipoFecha Especifica si se hara una consolta de tiempo
   * @param {string} buscar Parametro que indica si se buscara una cadena en especifico en las solicitudes
   * @returns {Promise<void>} Promesa vacia, el servicio gestiona internamente el guardado del archivo
   */
  public getCsv(sort: Sort, query: Solicitud, tipoFecha: TipoFecha, buscar: string = ""): Promise<void> {

    return new Promise((resolve, reject) => {

      let args: string = `${SolicitudesService.toUrlString(sort)}&${SolicitudesService.toUrlString(query)}&${SolicitudesService.toUrlString(tipoFecha)}`
      let urlPeticion = `${this.BASE_URL}/exportar?${args}&buscar=${buscar}`

      this.http.get(urlPeticion, { observe: "body", responseType: 'blob' })
        .subscribe((blobCsvSolicitudes) => {
          let blob: any = new Blob([blobCsvSolicitudes], { type: 'text/json; charset=utf-8' });
          const url = window.URL.createObjectURL(blob);
          fileSaver.saveAs(blob, "solicitudes.csv");
          resolve()

        }, error => {
          reject(error)
        })
    })
  }

  /**
   * @async
   * @function altaSolicitud Crea una nueva solicitud en klugit
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @param {NuevaSolicitud} solicitud Objeto con los valores 
   * @returns {Promise<number>} Promesa de un valor booleano indicando si fue o no exitosa la creacion de la solicitud
   */
  public altaSolicitud(solicitud: NuevaSolicitud): Promise<number> {

      return this.http.post<number>(`${this.BASE_URL}/levantarSolicitud`, solicitud)
        .toPromise()

  }

  /**
   * 
   * @param files Arreglo de archivos a adjuntar a la solicitud especificada
   * @param {number} idSolicitud Identificador de la solicitud
   * @returns {Promise<boolean>} Promesa de un booleano indicando si se adjunto el archivo de manera exitosa
   */
  public adjuntarArchivo(file: any, idSolicitud: number): Promise<any> {



      let multipartData = new FormData()
      multipartData.append("archivo", file)

      return this.http.post(`${this.BASE_URL}/adjuntar/${idSolicitud}`, multipartData, { observe: "response" })
        .toPromise()
  }

  /**
   * @async
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @function getTotales Obtiene cuantas solicitudes hay por cada estatus
   * @param {Solicitud} query Especifica los valores sobre los cuales se hara el filtrado de solicitudes
   * @param {TipoFecha} tipoFecha Especifica si se hara una consulta por tiempo y como se haria 
   * @param {string} buscar Indica lo que se debe buscar
   * @returns {Promise<any>} Objeto con los totales de solicitudes
   */
  public getTotales(query: Solicitud, tipoFecha: TipoFecha, buscar: string = ""): Promise<any> {
    let sQuery = SolicitudesService.toUrlString(query)
    let sFecha = SolicitudesService.toUrlString(tipoFecha)

    return this.http.get(`${this.BASE_URL}/totales?buscar=${buscar}&${sQuery}&${sFecha}`)
      .toPromise()
  }


  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param {number} idSolicitud id de la solicitud a la cual se le agregara el comentario 
   * @param {string} comentario comentario a agregar
   * @param {Blob} archivo En caso de que el comentario tenga un adjunto
   * @returns 
   */
  public agregarComentario(idSolicitud: number, comentario: string, archivo: Blob): Promise<any> {

    let formData = new FormData()
    formData.append("incidente", idSolicitud.toString())
    formData.append("comentario", comentario)
    formData.append("adjunto", archivo)
    formData.append("tipo", "1")

    return this.http.post(`${this.BASE_URL}/agregarComentario`, formData).toPromise()
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param idSolicitud id de la solicitud de la cual se quiere obtener los comentarios
   * @returns {Array<any>} Arreglo con los comentarios y sus respectivos adjuntos si los hubiere
   */
  public getComentarios(idSolicitud: number): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.BASE_URL}/comentarios/${idSolicitud}`).toPromise()
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param {number} solicitud id de la solicitud que se desea cerrar
   * @param {string} descripcion descripcion del cierre
   * @param {string} observaciones observaciones del cierre
   * @returns {Promise<void>} promesa sin contenido indicando el exito o fallo al cerrar la solicitud
   */
  public cerrarSolicitud(solicitud: number, descripcion: string, observaciones: string): Promise<any> {
    console.log(typeof solicitud)
    let body = {
      comentario: descripcion,
      observaciones: observaciones,
      tipo: 1
    }
    console.log(body)
    return this.http.post(`${this.BASE_URL}/cerrar/${solicitud}`, body).toPromise()
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param idSolicitud id de la solicitud de la cual se quiere obtener su detalle
   * @returns {Promise<NuevaSolicitud>} promesa con los datos de la solicitud
   */
  public detalleSolicitud(idSolicitud: number): Promise<NuevaSolicitud> {
    return this.http.get(`${this.BASE_URL}/solicitud/${idSolicitud}`).toPromise()
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param idSolicitud 
   * @param solicitud 
   * @returns {promise<any>} promesa que indica si la peticion fallo o no
   */
  public aceptarSolicitud(idSolicitud: number, agente: number): Promise<string> {
    return this.http.post<string>(`${this.BASE_URL}/aceptarSolicitud/${idSolicitud}?agente=${agente}`, {})
      .toPromise()
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param {number} idSolicitud id de la solicitud que se desea rechazar
   * @param {NuevaSolicitud} solicitud datos de la solicitud que se desea guardar
   * @returns {Promise<any>} promesa indicando el exito o fallo de la peticion
   */
  public rechazarSolicitud(idSolicitud: number, razonRechazo: string): Promise<any> {
    return this.http.post(`${this.BASE_URL}/rechazarSolicitud/${idSolicitud}?razonRechazon=${razonRechazo}`, {})
      .toPromise()
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param {number} idSolicitud id de la solicitud de la cual se desea cambiar algun valor 
   * @param {NuevaSolicitud} nuevosValores valores de la solicitud a ser cambiados 
   * @returns 
   */
  public guardarCambios(idSolicitud: number, nuevosValores: NuevaSolicitud): Promise<any> {
    return this.http.post(`${this.BASE_URL}/solicitud/${idSolicitud}`, nuevosValores).toPromise()
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param {number} idSolicitud id de la solcitud que se desea calificar
   * @param {number} calificacion calificacion entera que se le dara a la solicitud
   * @returns 
   */
  public calificarSolicitud(idSolicitud: number, calificacion: number): Promise<any> {
    return this.http.post(`${this.BASE_URL}/calificarSolicitud/${idSolicitud}?calificacion=${calificacion}`, {}).toPromise()
  }

  /**
   * @function toUrlString Convierte las propiedades de un objeto a una representacion de URL
   * @example {"prop1": "valor1", "prop2": false} = prop1="valor1"&prop2=false
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @param data Objeto sobre el cual se iterara para obtener sus valores como URL
   * @returns {string} cadena con los valores del objeto como query
   */
  private static toUrlString(data: any): string {
    let result: string = "";

    for (let property in data) {

      if (data[property] != undefined) {
        result = result.concat(property)
          .concat("=")
          .concat(data[property])
          .concat("&")
      }

    }

    result = result.substring(0, result.length - 1)
    return result
  }


}
