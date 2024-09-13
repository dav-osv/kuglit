import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  private grupos: any
  private detalleSolicitud: any

  constructor() { }

  public setGrupos(grupos: any){
    this.grupos = grupos
  }

  public getGrupos(){
    return this.grupos
  }

  public setDetalleSolicitud(solicitud: any){
    this.detalleSolicitud = solicitud
  }

  public getDetalleSolicitud() {
    return this.detalleSolicitud
  }
}
