import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GruposDeSoporteService } from '../../services/grupos-de-soporte.service';

@Component({
  selector: 'app-grupos-de-soporte',
  templateUrl: './grupos-de-soporte.component.html',
  styleUrls: ['./grupos-de-soporte.component.scss'],
})
export class GruposDeSoporteComponent implements OnInit {
  public idGrupoURL = '';
  public grupos = new Array()

  // -----Parametros list-----
  public page: number = 0;
  public size: number = 20;
  public sortBy: string = 'id';
  public search: any = null;
  public order: string = 'ASC';
  // public idsGrupos = new Array<number>();
  public idsGrupos: number[] = [1];
  // public idsAdministradores = new Array<number>();
  public idsAdministradores: number[] = [1, 2];


  // -----binding-----
  public nombreGrupoSoporte: string = '';
  public idGrupo: number = 1;
  public idAdministrador: number = 2;

  constructor(
    private gruposDeSoporteService: GruposDeSoporteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getIdGrupo();
    this.getListGrupos();
  }

  getIdGrupo() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.idGrupoURL = params.get('id') || '';
        console.log('this.idGrupo :>> ', this.idGrupo);
      } else {
        console.log('okokok :>> ');
      }
    });
  }

  getListGrupos() {
    const data = {
      page: this.page,
      size: this.size,
      sortBy: this.sortBy,
      search: this.search,
      order: this.order,
      idsGrupos: this.idsGrupos,
      idsAdministradores: this.idsAdministradores,
    };
    console.log('data mandado :>> ', data);
    this.gruposDeSoporteService.getLis(data).subscribe(
      (gruposSoporteResponse) => {
        console.log('grupos de soporte :>> ', gruposSoporteResponse?.datos);
        console.log(typeof gruposSoporteResponse)
        this.grupos = gruposSoporteResponse?.datos;
      },
      (err) => {
        console.log('errListGS :>> ', err);
        throw err;
      }
    );
  }

  crearGrupo(nombre: string) {
    const data = {
      nombre: nombre,
      idGrupo: this.idGrupo,
      idAdministrador: this.idAdministrador,
    };
    console.log('data mandado :>> ', data);
    this.gruposDeSoporteService.crear(data).subscribe(
      (res) => {
        console.log('resCrearGS :>> ', res);
      },
      (err) => {
        console.log('errCrearGS :>> ', err);
        throw err;
      }
    );
  }

  detalleGrupo(id: number) {
    this.gruposDeSoporteService.detalle(id).subscribe(
      (res) => {
        console.log('respuesta detalle :>> ', res);
      },
      (err) => {
        console.log('errDetalleGS :>> ', err);
        throw err;
      }
    );
  }

  actualizarGrupo(data: object) {
    this.gruposDeSoporteService.actualiza(data).subscribe(
      (res) => {
        console.log('resActualizaGS :>> ', res);
      },
      (err) => {
        console.log('errActualizaGS :>> ', err);
        throw err;
      }
    );
  }

  eliminarGrupo(id: number) {
    this.gruposDeSoporteService.elimina(id).subscribe(
      (res) => {
        console.log('resEliminaGS :>> ', res);
      },
      (err) => {
        console.log('errEliminaGS :>> ', err);
        throw err;
      }
    );
  }
}
