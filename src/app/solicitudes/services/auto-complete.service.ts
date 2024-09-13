import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  private static URL_BASE_SERVICE_DESK: string = `${environment.urlServiceDesk}/solicitudes`

  constructor(private http: HttpClient) { }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param {number} grupo id del grupo del cual se quieren obtener sus agentes 
   * @param {string} buscar cadena a buscar en los nombres de los agentes 
   * @param {1 | 2 | 3} nivel Nivel del agente, ya sea 1, 2 o 3
   * @returns {Promise<Array<any>>} Promesa de un arreglo con los agentes que cumplen las condiciones
   */
  public autoCompleteAgente(grupo: number, buscar: string = "", nivel: number = 1 | 2 | 3): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http.get<Array<any>>(`${AutoCompleteService.URL_BASE_SERVICE_DESK}/autoCompleteAgente?idGrupo=${grupo}&nivel=${nivel}&buscar=${buscar}`
      ).subscribe(agentes => {
        resolve(agentes)
      }, error => {
        reject(error)
      })
    })
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param {number} grupo id del grupo del cual se quiere obtener sus solicitantes (i.e. sus usuarios validos)
   * @param {string} buscar cadena que se va a buscar en los nombres de los solicitantes
   * @returns {Promise<Array<any>>} Promesa de un arreglo con los solicitantes que cumplan con las condiciones de busqueda
   */
  public autoCompleteSolicitante(grupo: number, buscar: string = ""): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http.get<Array<any>>(`${AutoCompleteService.URL_BASE_SERVICE_DESK}/autoCompleteSolicitante?grupo=${grupo}&buscar=${buscar}`
      ).subscribe(solicitantes => {
        resolve(solicitantes)
      }, error => {
        reject(error)
      })
    })
  }

}
