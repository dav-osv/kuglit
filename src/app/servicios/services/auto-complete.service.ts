import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  private static URL_BASE_SERVICE_DESK: string = `${environment.urlServiceDesk}`

  constructor(private http: HttpClient) { }

  public autoCompleteGrupo(usuario: number, buscar: string = ""): Promise<Array<any>> {
    return new Promise( (resolve, reject) => {
      this.http.get<Array<any>>(`${AutoCompleteService.URL_BASE_SERVICE_DESK}/Grupos/autocomplete?usuario=${
        usuario}&buscar=${
          buscar}`
      ).subscribe( data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }

  public autoCompleteDuenio(grupo: number, buscar: string = ""): Promise<Array<any>> {
    return new Promise( (resolve, reject) => {
      this.http.get<Array<any>>(`${AutoCompleteService.URL_BASE_SERVICE_DESK}/servicios/autocompleteDuenio/${
        grupo}?q=${buscar}&pagina=0&rowsOnPage=45`
      ).subscribe( data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }

  public autoCompleteReporteador(grupo: number, buscar: string = ""): Promise<Array<any>> {
    return new Promise( (resolve, reject) => {
      this.http.get<Array<any>>(`${AutoCompleteService.URL_BASE_SERVICE_DESK}/servicios/autoCompleteReporteador/${
        grupo}?q=${buscar}&pagina=0&rowsOnPage=45`
      ).subscribe( data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }

  public autocompleteAsignacionDirecta(grupo: number, buscar: string = ""): Promise<Array<any>> {
    return new Promise( (resolve, reject) => {
      this.http.get<Array<any>>(`${AutoCompleteService.URL_BASE_SERVICE_DESK}/servicios/autocompleteAsignacionDirecta/${
        grupo}?q=${buscar}&pagina=0&rowsOnPage=45`
      ).subscribe( data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }

  public autocompleteProveedores(grupo: number, buscar: string = ""): Promise<Array<any>> {
    return new Promise( (resolve, reject) => {
      this.http.get<Array<any>>(`${AutoCompleteService.URL_BASE_SERVICE_DESK}/proveedores/autocomplete/${
        grupo}?q=${buscar}&pagina=0&rowsOnPage=45`
      ).subscribe( data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
  


}
