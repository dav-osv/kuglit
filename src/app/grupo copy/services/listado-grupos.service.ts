import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListadoGruposService {
  private urlGrupos = `${environment.urlAdminService}/Grupos`;

  constructor(private http: HttpClient) {}

  getLis(
    page: number,
    size?: number,
    sortBy?: string,
    search?: string,
    order?: string
  ): Observable<any> {
    console.log('page recibido :>> ', page);
    console.log('size recibido :>> ', size);
    console.log('sortBy recibido :>> ', sortBy);
    console.log('search recibido :>> ', search);
    console.log('order recibido :>> ', order);

    let params = new HttpParams();
    params = params.append('page', `${page}`);
    size ? (params = params.append('size', `${size}`)) : null;
    sortBy ? (params = params.append('sortBy', `${sortBy}`)) : '';
    search ? (params = params.append('search', `${search}`)) : '';
    order ? (params = params.append('order', `${order}`)) : '';

    const url = `${this.urlGrupos}/list`;
    console.log(url)
    return this.http.get<any>(url, { params });
  }
}
