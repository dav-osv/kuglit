import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import Sort from 'src/app/core/interfaces/Sort';
import TipoFecha from 'src/app/core/interfaces/TipoFecha';
import { environment } from 'src/environments/environment';
import { HandleError, HttpErrorHandlerService } from 'src/app/servicios/services/http-error-handler.service';
import { Observable,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private BASE_URL: string = `${environment.urlServiceDesk}/categoria`;
  private handleError: HandleError

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('categorias')
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
  public getCategorias(sort: Sort, query: Categoria, tipo: Number, buscar: string = "",idGrupo: Number,estatus: Number,idServicio: Number): Promise< Array<Categoria> > {
    let args: string = `${CategoriaService.toUrlString(sort)}&${CategoriaService.toUrlString(query)}&${CategoriaService.toUrlString(tipo)}`
    let urlPeticion = `${this.BASE_URL}/listado?${args}&buscar=${buscar}&idGrupo=${idGrupo}&estatus=${estatus}&idServicio=${idServicio}`

    return new Promise( (resolve, reject) => {
      this.http.get<Array<Categoria>>(`${urlPeticion}`)
        .subscribe(data => {
          console.log(data)
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


  /* CRUD CATEGORIA  */

  public addCategory(categoria: Categoria): Observable<Categoria> {

    const urlPeticion = `${this.BASE_URL}/crearCategoria`;

    return this.http.post<Categoria>(`${urlPeticion}`,categoria)
    .pipe(
         retry(3), 
         catchError(this.handleError('addSubcategoria', categoria))
     );
  }


  public updateCategory(categoria: Categoria): Observable<Categoria>{

    const urlPeticion = `${this.BASE_URL}/update`

    return this.http.put<Categoria>(urlPeticion,categoria)
    .pipe(
         catchError(this.handleError('updateCategoria', categoria))
    );
   }

   public deleteCategory(id: number): Observable<unknown>{

    const urlPeticion = `${this.BASE_URL}/eliminar/${id}`
    return this.http.delete(urlPeticion)
    .pipe(
       catchError(this.handleError('deleteSubcategoria'))
    );
   }


   public editCategory(id: number){

    const urlPeticion = `${this.BASE_URL}/editar/${id}`
    return this.http.get<Categoria>(urlPeticion)
    .pipe(
       catchError(this.handleError('editSubcategoria',id))
    );
   }

  


}
