import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cuestionario } from '../interfaces/Cuestionario';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioParaUsuariosService {

  private static BASEURL: string = `${environment.urlServiceDesk}`

  constructor(private http: HttpClient) { }

  public getCuestionario(grupo: number, page: number = 0, size: number = 10): Promise<any> {
    const request = {
      page: page,
      size: size,
      sortBy: "posicion",
      idsGrupos: [ grupo ],
      idGrupo: grupo,
      order: "ASC",
      modulo: 0
    }
    return this.http.post(`${CuestionarioParaUsuariosService.BASEURL}/CamposExtras/list`, request)
      .toPromise()
  }

  public editarPregunta(pregunta: Cuestionario): Promise<any> {
    return this.http.post(`${CuestionarioParaUsuariosService.BASEURL}/CamposExtras/actualiza`, pregunta)
      .toPromise()
  }

  public eliminarPregunta(pregunta: Cuestionario): Promise<any> {
    return this.http.post(`${CuestionarioParaUsuariosService.BASEURL}/CamposExtras/eliminar`, pregunta)
      .toPromise()
  }

  public nuevaPregunta(pregunta: Cuestionario): Promise<any> {
    pregunta.modulo = 0
    return this.http.post(`${CuestionarioParaUsuariosService.BASEURL}/CamposExtras/crear`, pregunta)
      .toPromise()
  }
}
