import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private static BASE_URL_SERVICE_DESK: string = `${environment.urlServiceDesk}/categoria`

  constructor(private http: HttpClient) { }

  public getCategorias(servicio: number, grupo: number, buscar: string, estatus: number, pagina: number): Promise<Array<any>> {


    return this.http.get<Array<any>>(`${CategoriasService.BASE_URL_SERVICE_DESK
      }/listado?idGrupo=${grupo}&servicio=${servicio}&buscar=${buscar}&estatus=${estatus}&pagina=${pagina}`).toPromise()
  }

  public getOtrascategorias(grupo: number): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${CategoriasService.BASE_URL_SERVICE_DESK}/otrasCategorias?idGrupo=${grupo}`).toPromise()
  }
}
