import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { DominioService } from '../../services/dominio.service';
// interfaces
import { Dominio } from '../../interfaces/dominio';
import { MensajesService } from 'src/app/solicitudes/services/mensajes.service';

@Component({
  selector: 'app-dominio',
  templateUrl: './dominio.component.html',
  styleUrls: ['./dominio.component.scss'],
})
export class DominioComponent implements OnInit, AfterViewInit {
  // public htmlContent = '';
  // ID PARA EL DETALLE DEL DOMINIO
  public idGrupo = '';
  // OBJETO
  public dominio: Dominio = {};

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    // defaultParagraphSeparator: '',
    // defaultFontName: '',
    // defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... },
    // uploadWithCredentials: false,
    sanitize: true,
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };
  // BANDERAS
  public MDS: boolean = true;
  public TPST: boolean = false;
  public TYC: boolean = false;
  public AYP: boolean = false;
  // EDITOR DE TEXTO
  public mensajeSitio: string = '';
  public textoParaSoporteT: string = '';
  public terminosCondiciones: string = '';
  public avisoPrivacidad: string = '';

  @ViewChild("mensajeSitioHTML")
  mensajeSitioHTML!: ElementRef;

  @ViewChild("textoSoporteHTML")
  textoSoporteHTML!: ElementRef

  @ViewChild("terminosHTML")
  terminosHTML!: ElementRef

  @ViewChild("avisosHTML")
  avisosHTML!: ElementRef

  constructor(
    private route: ActivatedRoute,
    private dominioService: DominioService,
    private mensajes: MensajesService
  ) { }

  ngOnInit(): void {
    this.getIdGrupo();
    this.detalle();
  }

  ngAfterViewInit(): void {
    this.mensajeSitioHTML.nativeElement.style.textDecoration = "underline"
    this.mensajeSitioHTML.nativeElement.style.fontSize = "x-large"
  }

  getIdGrupo() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.idGrupo = params.get('id') || '';
      } else {
        console.log('okokok :>> ');
      }
    });
  }

  detalle() {
    this.dominioService.getDetalle(this.idGrupo).subscribe(
      (detalleDominio) => {
        this.dominio = detalleDominio;
        this.mensajeSitio = detalleDominio.mensajeSitio!
        this.textoParaSoporteT = detalleDominio.textoParaSoporteT!
        this.terminosCondiciones = detalleDominio.terminosCondiciones!
        this.avisoPrivacidad = detalleDominio.avisoPrivacidad!
        console.log(detalleDominio)
      },
      (err) => {
        console.log('errDetDom :>> ', err);
      }
    );
  }

  cambiarTXT(num: number, txt: string) {
    this.mensajeSitioHTML.nativeElement.style.textDecoration = ""
    this.textoSoporteHTML.nativeElement.style.textDecoration = ""
    this.terminosHTML.nativeElement.style.textDecoration = ""
    this.avisosHTML.nativeElement.style.textDecoration = ""

    this.mensajeSitioHTML.nativeElement.style.fontSize = "medium"
    this.textoSoporteHTML.nativeElement.style.fontSize = "medium"
    this.terminosHTML.nativeElement.style.fontSize = "medium"
    this.avisosHTML.nativeElement.style.fontSize = "medium"


    switch (num) {
      case 1:
        this.mensajeSitioHTML.nativeElement.style.textDecoration = "underline"
        this.mensajeSitioHTML.nativeElement.style.fontSize = "x-large"
        this.MDS = true;
        this.TPST = false;
        this.TYC = false;
        this.AYP = false;
        // console.log('1 :>> ', num);
        this.mensajeSitio = txt;
        break;
      case 2:
        this.textoSoporteHTML.nativeElement.style.textDecoration = "underline"
        this.textoSoporteHTML.nativeElement.style.fontSize = "x-large"
        this.MDS = false;
        this.TPST = true;
        this.TYC = false;
        this.AYP = false;
        // console.log('2 :>> ', num);
        this.textoParaSoporteT = txt;
        break;
      case 3:
        this.terminosHTML.nativeElement.style.textDecoration = "underline"
        this.terminosHTML.nativeElement.style.fontSize = "x-large"
        this.MDS = false;
        this.TPST = false;
        this.TYC = true;
        this.AYP = false;
        // console.log('3 :>> ', num);
        this.terminosCondiciones = txt;
        break;
      case 4:
        this.avisosHTML.nativeElement.style.textDecoration = "underline"
        this.avisosHTML.nativeElement.style.fontSize = "x-large"
        this.MDS = false;
        this.TPST = false;
        this.TYC = false;
        this.AYP = true;
        // console.log('4 :>> ', num);
        this.avisoPrivacidad = txt;
        break;
    }
  }

  guardar(dominio: Dominio) {
    console.log(dominio)
    dominio.avisoPrivacidad = this.avisoPrivacidad
    dominio.mensajeSitio = this.mensajeSitio
    dominio.textoParaSoporteT = this.textoParaSoporteT
    dominio.terminosCondiciones = this.terminosCondiciones
    this.dominioService.actualizar(dominio).subscribe(
      (res) => {
        console.log('resGuardar :>> ', res);
        this.mensajes.printToast("success", "Klugit", "Grupo actualizado correctamente")
      },
      (err) => {
        console.log('errGuardar :>> ', err);
        this.mensajes.printToast("error", "Klugit", "Error actualizando la información del grupo, intente mas tarde")
      }
    );

  }
}
