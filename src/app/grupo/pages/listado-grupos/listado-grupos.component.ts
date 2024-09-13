import { Component, OnInit } from '@angular/core';
import { ListadoGruposService } from '../../services/listado-grupos.service';
import { Router } from '@angular/router';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { MensajesService } from 'src/app/solicitudes/services/mensajes.service';
import { ConfirmEventType } from 'primeng/api';
import Sort from 'src/app/core/interfaces/Sort';

@Component({
  selector: 'app-listado-grupos',
  templateUrl: './listado-grupos.component.html',
  styleUrls: ['./listado-grupos.component.scss'],
})
export class ListadoGruposComponent implements OnInit {


  public search: string = '';
  public sort: Sort = {
    sort: "id",
    sorting: 1,
    pagina: 0
  }

  public listGrupos = new Array<any>();
  public totalGrupos: number = 0
  public rows: number = 10

  public grupoDetalle: any = {}

  constructor(
    private listadoGruposService: ListadoGruposService,
    private router: Router,
    private grupos: GrupoService,
    private mensajes: MensajesService
  ) {
  }

  ngOnInit(): void {
    this.getListaGrupos();
  }

  getListaGrupos() {
    this.listadoGruposService
      .getList(
        this.sort.pagina!,
        this.sort.rowsOnPage,
        this.sort.sort,
        this.search ? this.search : '',
        this.sort.sorting == 1 ? "DESC": "ASC"
      )
      .subscribe(
        (res) => {
          this.listGrupos = res;
        },
        (err) => {
          throw err;
        }
      );
  }

  selectGrupo(idGrupo: number) {
    this.router.navigate(['listado/grupo', idGrupo, 'dominio', idGrupo]);
  }

  public detalleGrupo(id: number) {
    console.log(id)
  }

  public async borrarGrupo(id: number) {

    try {
      this.mensajes.confirmDialog("Esta seguro de que desea borrar el grupo ?", async () => {
        
        try {
          await this.grupos.borrarGrupo(id)
        } catch (error) {
          console.log(error)
        }

      }, (eventCancel: ConfirmEventType) => {
        console.log(eventCancel)
      })
    } catch (error) {
      console.log(error)
    }
  }

  public nuevaSolicitud() {
    
  }

  public async onChangePage(event: any) {

  }

  public async getGrupos() {

    try {
      this.listGrupos = await this.listadoGruposService.getList(
        this.sort.pagina!,
        this.sort.rowsOnPage,
        this.sort.sort,
        this.search ? this.search : '',
        this.sort.sorting == 1 ? "DESC": "ASC"
      ).toPromise()
    } catch (error) {
      console.log(error)
    }
  }

  public async onClickGrupo(event: any) {
    this.selectGrupo(event.data.id)
  }
}
