import { Injectable } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private messages: MessageService,
    private confirmacion: ConfirmationService) { }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @function printToast Imprime un toast con el mensaje y el titulo especificado.
   *                Requiere de un elemento "p-toast" en el html del componente
   *                que lo vaya a utilizar
   * @param  nivelError Estilo que tendra el mensaje
   * @param {string} titulo Titulo del mensaje ("Klugit" por defecto)
   * @param {string} mensaje Mensaje a imprimir 
   * @see {@link https://www.primefaces.org/primeng/showcase/#/toast}
   */
  public printToast(nivelError: "success" | "info" | "warn" | "error", titulo: string, mensaje: string){
    this.messages.add({ severity: nivelError, summary: titulo, detail: mensaje })
  }

  /**
   * @author Jose Luis Ordonhez Perez <jperez@nordsterntech.com>
   * @function confirmDialog Imprime un dialogo para confirmar una accion
   *                         Requiere un elemento "p-confirmDialog" en el html del componente
   *                         que lo vaya a utulizar
   * @param {string} mensaje Mensaje de la confirmacion
   * @param {() => void} onConfirm callback sin argumentos en caso de que el dialogo sea aceptado, tal callback no recibe argumentos y retorna void
   * @param {(ConfirmEventType) => void} onReject callback a llamar en caso de que el dialogo sea rechazado o cerrado, recibe como argumento el tipo de evento 
   * que hizo que el dialogo haya sido rechazado (si fue cerrado o rechazado)
   * @param {string} titulo Titulo del dialogo de confirmacion, por defecto "Klugit"
   * @param {string} confirmLabel Texto que tendra el boton para confirmar el dialogo, por defecto "Si" 
   * @param {string} rejectLabel Texto que tendra el boton para rechazar el dialogo, por defecto "no"
   * @see {@link https://www.primefaces.org/primeng/showcase/#/confirmdialog}
   */
  public confirmDialog(mensaje: string, onConfirm: () => void, onReject: (eventType: ConfirmEventType) => void, titulo: string = "Klugit", confirmLabel: string = "Si", rejectLabel: string = "No") {
    this.confirmacion.confirm({
      message: mensaje,
      accept: onConfirm,
      reject: onReject,
      header: titulo,
      acceptLabel: confirmLabel,
      rejectLabel: rejectLabel
    })
  }
}
