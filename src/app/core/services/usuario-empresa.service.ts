import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioEmpresaService {
  private urlUsuarioEmpresa = `${environment.urlServiceDesk}/UsuarioEmpresa`;

  constructor(private http: HttpClient) {}

  // getAgentesN1(): Observable<any> {}

  public getUser(id: number): Promise<any> {
    return this.http.get("").toPromise()
  }

}
