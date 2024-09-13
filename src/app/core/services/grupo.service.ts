import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private static BASE_URL_SERVICE_DESK: string = `${environment.urlServiceDesk}/Grupos`
  private static BASE_URL_ADMIN: string = `${environment.urlAdminService}/Grupos`

  constructor(private http: HttpClient,
    private localStorage: LocalstorageService) { }

  public getGruposByUsuario(buscar: string = ""): Promise<Array<any>> {


      return this.http.get<Array<any>>(`${GrupoService.BASE_URL_ADMIN}/list?buscar=${buscar}`)
        .toPromise()
  }

  public getGruposDeSoporte(body: {
    page: number,
    size: number,
    sortBy: string,
    search?: string,
    order: "ASC" | "DESC",
    idsGrupos: Array<number>,
    idsAdministradores: Array<number>
  }) {
    return this.http.post<Array<any>>(`${environment.urlServiceDesk}/GrupoSoporte/list`, body).toPromise()
  }

  public borrarGrupo(id: number): Promise<any> {
    return this.http.post("", {})
      .toPromise()
  }

  public getLocalidades1(grupo: number, search: string, maxResult: number = 100): Promise<any> {
    return this.http.get<any>(`${environment.urlAdminService}/Localidad1/autocomplite?search=${search}&idGrupo=${grupo}&maxResults=${maxResult}`)
      .toPromise()
      .then ( localidades => localidades.list)
  }

  public getLocalidades2(grupo: number, search: string, maxResult: number = 100): Promise<any> {
    return this.http.get<any>(`${environment.urlAdminService}/Localidad2/autocomplite?search=${search}&idGrupo=${grupo}&maxResults=${maxResult}`)
      .toPromise()
      .then( localidades2 => localidades2.list )
  }

  public getRegiones(grupo: number, search: string, maxResult: number = 100): Promise<any> {
    return this.http.get<any>(`${environment.urlAdminService}/Regiones/autocomplite?search=${search}&idGrupo=${grupo}&maxResults=${maxResult}`)
      .toPromise()
      .then( regiones => regiones.list)
  }

  public getUsuariosByGrupo(grupo: number, search: string, perfil: any[] = [1, 2, 3]): Promise< any > {
    return this.http.post< any >(`${environment.urlAdminService}/Usuarios/list`, {
      idsGrupos: [ grupo ],
      order: "ASC",
      sortBy: "usuario.nombre",
      perfil: perfil,
      page: 0,
      size: 100,
      search: search
    })
      .toPromise()
      .then( usuarios => usuarios.usuarios )
  }

  public agregarCorreoSLA(nuevoCorreo: any) {
    return this.http.post(`${GrupoService.BASE_URL_SERVICE_DESK}/agregaCorreoNombre`, nuevoCorreo)
      .toPromise()
  }

  public editarCorreoSLA(nuevosValores: any) {
    return this.http.post(`${GrupoService.BASE_URL_SERVICE_DESK}/actualizaCorreoNombre`, nuevosValores)
      .toPromise()
  }

  public borrarCorreoSLA(correo: any) {
    return this.http.post(`${GrupoService.BASE_URL_SERVICE_DESK}/eliminaCorreoNombre`, correo)
      .toPromise()
  }

  public getCorreoSLA(grupo: number): Promise<any> {
    return this.http.get(`${GrupoService.BASE_URL_SERVICE_DESK}/detalleCorreoSLA?id=${grupo}`)
      .toPromise()

  }

}
