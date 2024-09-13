import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

import Sort from 'src/app/core/interfaces/Sort';
import { Observable,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandlerService } from 'src/app/servicios/services/http-error-handler.service';
import Subcategoria from 'src/app/servicios/modelos/Subcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {
 
  private BASE_URL: string = `${environment.urlServiceDesk}/subcategorias`;
  private handleError: HandleError

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService ) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }


  public getSubcategorias(sort: Sort, query: Subcategoria, tipo: Number, buscar: string = "",idGrupo: Number,estatus: Number,idServicio: Number): Promise< Array<Subcategoria>> {
    let args: string = `${SubcategoriasService.toUrlString(sort)}&${SubcategoriasService.toUrlString(query)}&${SubcategoriasService.toUrlString(tipo)}`
    let urlPeticion = `${this.BASE_URL}/listado?${args}&buscar=${buscar}&idGrupo=${idGrupo}&estatus=${estatus}&idServicio=${idServicio}`

    return new Promise( (resolve, reject) => {
      this.http.get<Array<Subcategoria>>(`${urlPeticion}`)
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


  public addSubcategoria(subcategoria: Subcategoria): Observable<Subcategoria> {

    const urlPeticion = `${this.BASE_URL}/add`;

    return this.http.post<Subcategoria>(`${urlPeticion}`,subcategoria)
    .pipe(
         retry(3), 
         catchError(this.handleError('addSubcategoria', subcategoria))
     );
  }


  public updateSubcategoria(subcategoria: Subcategoria): Observable<Subcategoria>{

    const urlPeticion = `${this.BASE_URL}/update`

    return this.http.put<Subcategoria>(urlPeticion,subcategoria)
    .pipe(
         catchError(this.handleError('updateCategoria', subcategoria))
    );
   }

   public deleteSubcategoria(id: number): Observable<unknown>{

    const urlPeticion = `${this.BASE_URL}/${id}`
    return this.http.delete(urlPeticion)
    .pipe(
      catchError(this.handleError('deleteSubcategoria'))
    );
   }


   public editSubcategoria(id: number){

    const urlPeticion = `${this.BASE_URL}/edit/${id}`
    return this.http.get<Subcategoria>(urlPeticion)
    .pipe(
      catchError(this.handleError('editSubcategoria',id))
    );
   }

}
