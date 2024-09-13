import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private static URL_BASE_SERVICE_DESK: string = `${environment.urlServiceDesk}/servicios`

  constructor(private http: HttpClient) { }

  public getServicios(grupo: number, buscar: string, pagina: number, estatus: string | number, tipo: string | number) : Promise<Array<any>> {
    return new Promise( (resolve, reject) => {
      this.http.get<Array<any>>(`${
        ServiciosService.URL_BASE_SERVICE_DESK
      }/listarServicios?idGrupo=${grupo}&buscar=${buscar}&pagina=${pagina}&estatus=${estatus}&tipo=${tipo}`)
        .subscribe( servicios => {
          resolve(servicios)
        }, error => {
          reject(error)
        })
    })
  }
}
