import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private static BASE_URL = `${environment.urlServiceDesk}/subcategoria`

  constructor(private http: HttpClient) { }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @async
   * @param categoria id de la categoria de la cula se quiere obtener sus subcategorias 
   * @param pagina pagina que se quiere obtener (indice base cero)
   * @returns {Promise<Array<any>>} Promesa de un arreglo con las subcategorias que cumplan lo especificado
   */
  public getSubcategorias(categoria: number, pagina: number): Promise<Array<any>> {

     return this.http.get<Array<any>>(`${SubcategoriaService.BASE_URL}/listado?categoria=${categoria}&pagina=${pagina}`)
        .toPromise()
  }
}
