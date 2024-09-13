import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dominio } from '../interfaces/dominio';

@Injectable({
  providedIn: 'root',
})
export class DominioService {
  private urlGrupos = `${environment.urlAdminService}/Grupos`;

  constructor(private http: HttpClient) {}

  getDetalle(idGrupo: any): Observable<Dominio> {
    console.log('idGrupo recibido:>> ', idGrupo);

    let body = {
      id: idGrupo
    }

    const url = `${this.urlGrupos}/detalleDominio`;
    return this.http.post<Dominio>(url, body);
  }

  actualizar(dominio: Dominio): Observable<Dominio> {
    console.log('dominio recibido :>> ', dominio);

    const url = `${this.urlGrupos}/actualizarDominio`;
    return this.http.post<Dominio>(url, dominio);
  }
}
