import { Component, OnInit } from '@angular/core';
import { ListadoGruposService } from '../../services/listado-grupos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-grupos',
  templateUrl: './listado-grupos.component.html',
  styleUrls: ['./listado-grupos.component.scss'],
})
export class ListadoGruposComponent implements OnInit {

  // -----Parametros list-----
  public page: number = 0;
  public size: any = null;
  // public size: any = 20;
  // public sortBy: string = 'id';
  public sortBy: string = '';
  public search: string = '';
  // public order: string = 'ASC';
  public order: string = '';

  public listGrupos = new Array<any>();
  //  public listGrupos = new Array

  constructor(
    private listadoGruposService: ListadoGruposService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListaGrupos();
  }

  getListaGrupos() {
    console.log('page mandado :>> ', this.page);
    console.log('size mandado :>> ', this.size);
    console.log('sortBy mandado :>> ', this.sortBy);
    console.log('search mandado :>> ', this.search);
    console.log('order mandado :>> ', this.order);

    this.listadoGruposService
      .getLis(
        this.page,
        this.size ? this.size : null,
        this.sortBy ? this.sortBy : '',
        this.search ? this.search : '',
        this.order ? this.order : ''
      )
      .subscribe(
        (res) => {
          console.log('respuesta grupos de soporte :>> ', res);
          this.listGrupos = res;
        },
        (err) => {
          console.log('errListG :>> ', err);
          throw err;
        }
      );
  }

  selectGrupo(idGrupo: number) {
    this.router.navigate(['listado/grupo', idGrupo, 'dominio', idGrupo]);
  }
}
