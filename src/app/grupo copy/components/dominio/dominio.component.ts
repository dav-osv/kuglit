import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { DominioService } from '../../services/dominio.service';
// interfaces
import { Dominio } from '../../interfaces/dominio';

@Component({
  selector: 'app-dominio',
  templateUrl: './dominio.component.html',
  styleUrls: ['./dominio.component.scss'],
})
export class DominioComponent implements OnInit {
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
  public mensajeSitio: string = 'mensajeSitio';
  public textoParaSoporteT: string = 'textoParaSoporteT';
  public terminosCondiciones: string = 'terminosCondiciones';
  public avisoPrivacidad: string = 'avisoPrivacidad';

  constructor(
    private route: ActivatedRoute,
    private dominioService: DominioService
  ) {}

  ngOnInit(): void {
    this.getIdGrupo();
    this.detalle();
  }

  getIdGrupo() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.idGrupo = params.get('id') || '';
        console.log('this.idGrupo :>> ', this.idGrupo);
      } else {
        console.log('okokok :>> ');
      }
    });
  }

  detalle() {
    this.dominioService.getDetalle(this.idGrupo).subscribe(
      (res) => {
        console.log('detalle dominio :>> ', res);
        this.dominio = res;
      },
      (err) => {
        console.log('errDetDom :>> ', err);
      }
    );
  }

  cambiarTXT(num: number, txt: string) {
    // console.log('num :>> ', num);
    switch (num) {
      case 1:
        this.MDS = true;
        this.TPST = false;
        this.TYC = false;
        this.AYP = false;
        // console.log('1 :>> ', num);
        this.mensajeSitio = txt;
        break;
      case 2:
        this.MDS = false;
        this.TPST = true;
        this.TYC = false;
        this.AYP = false;
        // console.log('2 :>> ', num);
        this.textoParaSoporteT = txt;
        break;
      case 3:
        this.MDS = false;
        this.TPST = false;
        this.TYC = true;
        this.AYP = false;
        // console.log('3 :>> ', num);
        this.terminosCondiciones = txt;

        break;
      case 4:
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
    this.dominioService.actualizar(dominio).subscribe(
      (res) => {
        console.log('resGuardar :>> ', res);
      },
      (err) => {
        console.log('errGuardar :>> ', err);
      }
    );
  }
}
