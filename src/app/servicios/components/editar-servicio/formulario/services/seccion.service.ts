import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { HandleError, HttpErrorHandlerService } from 'src/app/servicios/services/http-error-handler.service';
import { Observable,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Seccion from 'src/app/servicios/modelos/Seccion';

@Injectable({
  providedIn: 'root'
})

export class sectionService {

  private BASE_URL: string = `${environment.urlServiceDesk}/cuestionario`;
  private handleError: HandleError

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('cuestionario')
  }


  public addSection(section: Seccion): Observable<Seccion> {

    const urlPeticion = `${this.BASE_URL}/nuevaSeccion`;

    return this.http.post<Seccion>(`${urlPeticion}`,section)
    .pipe(
         retry(3), 
         catchError(this.handleError('addSection', section))
     );
  }


  public updateSection(section: Seccion): Observable<Seccion>{

    const urlPeticion = `${this.BASE_URL}/editarSeccion`

    return this.http.put<Seccion>(urlPeticion,section)
    .pipe(
         catchError(this.handleError('updateCategoria', section))
    );
   }

   public deleteSection(id: number): Observable<unknown>{
    const urlPeticion = `${this.BASE_URL}/eliminar/${id}`
    return this.http.delete(urlPeticion)
    .pipe(
        catchError(this.handleError('deleteSection'))
    );
   }


   public editSection(id: number){

    const urlPeticion = `${this.BASE_URL}/editar/${id}`
    return this.http.get<Categoria>(urlPeticion)
    .pipe(
       catchError(this.handleError('editSubcategoria',id))
    );
   }
   
   
  


}
