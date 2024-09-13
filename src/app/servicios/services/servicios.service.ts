import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ServicioContacto from 'src/app/core/interfaces/ServicioContacto';
// import Servicios from 'src/app/core/interfaces/Servicios';
import Sort from 'src/app/core/interfaces/Sort';
import TipoFecha from 'src/app/core/interfaces/TipoFecha';
import { environment } from 'src/environments/environment';
import Servicio from '../modelos/Servicio';


import { Observable,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandlerService } from 'src/app/servicios/services/http-error-handler.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';


// const httpOptions = {
//   headers: new HttpHeaders({
//       token: 'my-auth-token'
//   })
// };


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private BASE_URL: string = `${environment.urlServiceDesk}/servicios`;
  
  private handleError: HandleError

	public listServices: Array<Servicio> = []
  public service: Servicio = {}
  


  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService,
    private localstorageService: LocalstorageService) {
    this.handleError = httpErrorHandler.createHandleError('ServiciosService');
  }


  /**
   * 
   * @author Christian Vanessa Flores Zárate <cflores@nordsterntech.com>
   * @param sort Especifica el tipo de ordenamiento que tendra la consulta
   * @param query Especifica el tipo de filtrado de los servicios
   * @param tipoFecha Especifica si hay algún tipo de filtrado por fecha y el inicio y fin del filtrado de fecha
   * @param buscar Especifica lo una cadena a ser buscada
   * @returns Promesa con los servicios especificados
   */


  public getServicios(sort: Sort, query: Servicio, tipoFecha: TipoFecha, buscar: string = "",idUsuario: Number): Promise< Array<Servicio> > {

    let args: string = `${ServiciosService.toUrlString(sort)}&${ServiciosService.toUrlString(query)}&${ServiciosService.toUrlString(tipoFecha)}`
    let urlPeticion = `${this.BASE_URL}/listarServicios?${args}&buscar=${buscar}&idUsuario=${idUsuario}`
    
  

    return new Promise( (resolve, reject) => {
      this.http.get<Array<Servicio>>(`${urlPeticion}`)
        .subscribe(data => {
       
          resolve(data)
        }, error => {
          reject(error)
        })
    })
  }

  
  private static toUrlString(data: any): string {
    let result: string = "";

    for(let property in data) {

      if(data[property] != undefined){
        result = result.concat(property)
              .concat("=")
              .concat(data[property])
              .concat("&")
      }

    }

    result = result.substring(0, result.length - 1)
    return result
  }

  
  /**
   * 
   * @author Christian Vanessa Flores Zárate <cflores@nordsterntech.com>
   * @param sort Especifica el tipo de ordenamiento que tendra la consulta
   * @param query Especifica el tipo de filtrado de los servicios
   * @param tipoFecha Especifica si hay algún tipo de filtrado por fecha y el inicio y fin del filtrado de fecha
   * @param buscar Especifica lo una cadena a ser buscada
   * @returns Promesa con los servicios especificados
   */
   public getContactos(sort: Sort, query: Servicio, buscar: string = "",idServicio: Number): Promise< Array<ServicioContacto> > {
    let args: string = `${ServiciosService.toUrlString(sort)}&${ServiciosService.toUrlString(query)}`
    let urlPeticion = `${this.BASE_URL}/listarContactos?${args}&buscar=${buscar}&idUsuario=${idServicio}`

    return new Promise( (resolve, reject) => {
      this.http.get<Array<ServicioContacto>>(`${urlPeticion}`)
        .subscribe(data => {
          console.log(data)
          resolve(data)
        }, error => {
          reject(error)
        })
    })
  }



  
   
/**
   * 
   * @author David Osvaldo Rocha Rodríguez <drocha@nordsterntech.com>
   *                    CRUD SERVICIES
**/


public addServicio(newServicio: Servicio): Observable<Servicio> {
   
  const urlPeticion = `${this.BASE_URL}/altaServicio`;

  console.log(newServicio)

  return this.http.post<Servicio>(`${urlPeticion}`,newServicio)
   .pipe(
        retry(3), 
        catchError(this.handleError('addServicio', newServicio))
    );
}

  public edit(servicio: Servicio){
       this.service = servicio
  }

  public getService(){
      return this.service;
  }


  public update(service: Servicio){

     const urlPeticion = `${this.BASE_URL}/update/${service.id}`

    return this.http.put<Servicio>(urlPeticion,service)
    .pipe(
         catchError(this.handleError('updateCategoria', service))
    );
  }


  public delete(id: number){
    console.log(id);
    const urlPeticion = `${this.BASE_URL}/eliminar/${id}`
    const token = this.localstorageService.get('DATA_LOGIN').token;


    const httpOptions = {
     headers: new HttpHeaders({
        "token": token
     })
   };

    return this.http.post(`${urlPeticion}`,httpOptions)
    .pipe(
      catchError(this.handleError('delete'))
    );
  }
}
