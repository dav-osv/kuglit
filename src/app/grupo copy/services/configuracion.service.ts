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
    console.log('idGrupo recibido :>> ', idGrupo);

    let params = new HttpParams().append('id', `${idGrupo}`);

    const url = `${this.urlGrupos}/detalleConfiguracion`;
    return this.http.get<any>(url, { params });
  }
}
