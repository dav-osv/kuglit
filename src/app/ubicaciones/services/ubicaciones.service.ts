import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UbicacionesService {

    private static URL_BASE_ADMIN_SERVICE: string = `${environment.urlAdminService}`

  constructor(private http: HttpClient) { }

  /**
   * 
   * @author Christian Vanessa Flores Zárate <cflores@nordsterntech.com>
   * @param buscar Especifica lo una cadena a ser buscada
   * @returns Promesa con los servicios especificados
   */
   public autocompleteLocalidad1(grupo: number, buscar: string = ""): Promise<Array<any>> {
    return new Promise( (resolve, reject) => {
      this.http.get<Array<any>>(`${UbicacionesService.URL_BASE_ADMIN_SERVICE}/Localidad1/autocomplete?idGrupo=${
        grupo}&search=${buscar}&maxResult=45`
      ).subscribe( data => {
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


}
