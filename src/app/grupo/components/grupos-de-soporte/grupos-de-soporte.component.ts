import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrupoService } from 'src/app/core/services/grupo.service';
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
  public order: string = 'ASC'

  public idsGrupos: number[] = [];
  public idsAdministradores: number[] = [];

  public posiblesAdministradores: any[] = []

  // -----binding-----
  public nombreGrupoSoporte: string = '';
  public idGrupo: number = 0;
  public idAdministrador: number = 2;

  constructor(
    private gruposDeSoporteService: GruposDeSoporteService,
    private grupoService: GrupoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.idGrupo = Number.parseInt(params.get('id') || '0');

        const queryGrupos = {
          page: this.page,
          size: this.size,
          sortBy: this.sortBy,
          search: this.search,
          order: this.order,
          idsGrupos: [this.idGrupo],
          idsAdministradores: this.idsAdministradores
        };

        this.gruposDeSoporteService.getList(queryGrupos).subscribe(
          (gruposSoporteResponse) => {
            this.grupos = gruposSoporteResponse?.datos;
            console.log(this.grupos)
          },
          (err) => {
            console.log('errListGS :>> ', err);
          }
        );

        try {
          this.posiblesAdministradores = await this.grupoService.getUsuariosByGrupo(this.idGrupo, "", [1, 2])
        } catch (error) {
          console.log(error)
        }


      } else {
        console.log('okokok :>> ');
      }
    });
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
