import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GruposDeSoporteService {
  private urlGruposSoporte = `${environment.urlServiceDesk}/GruposSoporte`;

  constructor(private http: HttpClient) {}

  getLis(data: any): Observable<any> {
    console.log('query de grupos de soporte :>> ', data);

    const url = `${this.urlGruposSoporte}/list`;
    return this.http.post<any>(url, data);
    // .pipe(map((resp) => resp['data']));
  }

  crear(data: object): Observable<any> {
    console.log('data recibido :>> ', data);
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('token', token);

    // let headers = new HttpHeaders().append('Content-Type', 'application/json');
    // headers = headers.append('token', 'token');

    const url = `${this.urlGruposSoporte}/crear`;
    return this.http.post<any>(url, data);
    // .pipe(map((res) => res['data']));
  }

  detalle(id: number): Observable<any> {
    console.log('id recibido :>> ', id);

    // const params = new HttpParams().append('id', 'id');
    let params = new HttpParams().append('id', `${id}`);
    // params = params.append('', '');

    const url = `${this.urlGruposSoporte}/detalle`;
    // const url = `${this.urlGruposSoporte}/detalle?id=${id}`;
    return this.http.get<any>(url, { params });
    // .pipe(map((res) => res['data']));
  }

  actualiza(data: any): Observable<any> {
    console.log('data recibido :>> ', data);

    const url = `${this.urlGruposSoporte}/actualiza`;
    return this.http.post<any>(url, data);
    // .pipe(map((res) => res['data']));
  }

  elimina(data: any): Observable<any> {
    console.log('data recibido :>> ', data);

    const url = `${this.urlGruposSoporte}/elimina`;
    return this.http.post<any>(url, data);
    // .pipe(map((res) => res['data']));
  }
}
