import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private urlGrupos = `${environment.urlServiceDesk}/Grupos`;

  constructor(private http: HttpClient) {}

  getDetalle(idGrupo: any): Observable<any> {
    let params = new HttpParams().append('id', `${idGrupo}`);

    const url = `${this.urlGrupos}/detalleConfiguracion`;
    return this.http.get<any>(url, { params });
  }

  actualizarConfiguracion(configuracion: any) {
    return this.http.post(`${this.urlGrupos}/actualizaConfiguracion`, configuracion)
      .toPromise()
  }

  actualizarUsuariosSLA(grupo: number, usuarios: number[]) {
    return this.http.post(`${this.urlGrupos}/actualizaUsuariosSLA`, {
      idGrupo: grupo,
      idsUsuarioEmpresa: usuarios
    })
      .toPromise()
  }

}
