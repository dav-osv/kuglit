import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Categoria from 'src/app/servicios/modelos/Categoria';
import { environment } from 'src/environments/environment';
import { HandleError, HttpErrorHandlerService } from 'src/app/servicios/services/http-error-handler.service';
import { Observable,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Seccion from 'src/app/servicios/modelos/Seccion';
import Pregunta from 'src/app/servicios/modelos/Pregunta';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  private BASE_URL: string = `${environment.urlServiceDesk}/cuestionario`;
  private handleError: HandleError

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('cuestionario')
  }


  public addQuestion(question: Pregunta): Observable<Pregunta> {

    const urlPeticion = `${this.BASE_URL}/nuevaPregunta`;

    return this.http.post<Seccion>(`${urlPeticion}`,question)
    .pipe(
         retry(3), 
         catchError(this.handleError('addQuestion', question))
     );
  }


  public updateQuestion(question: Pregunta): Observable<Pregunta>{

    const urlPeticion = `${this.BASE_URL}/editarSeccion`

    return this.http.put<Pregunta>(urlPeticion,question)
    .pipe(
         catchError(this.handleError('updateQuestion', question))
    );
   }

   public deleteQuestion(id: number): Observable<unknown>{
    const urlPeticion = `${this.BASE_URL}/eliminar/${id}`
    return this.http.delete(urlPeticion)
    .pipe(
       catchError(this.handleError('deleteQuestion'))
    );
   }


   public editQuestion(id: number){

    const urlPeticion = `${this.BASE_URL}/editar/${id}`
    return this.http.get<Categoria>(urlPeticion)
    .pipe(
       catchError(this.handleError('editQuestion',id))
    );
   }
   
   
  


}
