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

  getList(
    page: number,
    size?: number,
    sortBy?: string,
    search?: string,
    order?: string
  ): Observable<any> {

    let params = new HttpParams();
    params = params.append('page', `${page}`);
    size ? (params = params.append('size', `${size}`)) : null;
    sortBy ? (params = params.append('sortBy', `${sortBy}`)) : '';
    search ? (params = params.append('search', `${search}`)) : '';
    order ? (params = params.append('order', `${order}`)) : '';

    const url = `${this.urlGrupos}/list`;
    return this.http.get<any>(url, { params });
  }
}
