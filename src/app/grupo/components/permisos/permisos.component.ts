import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrupoService } from 'src/app/core/services/grupo.service';
// import {  }

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent implements OnInit {
  public idGrupo = 0;

  // Banderas
  public allCanPost: boolean = false;
  public directorioUsuarios: boolean = false;
  public directorioUsuariosTodos: boolean = false
  public directorioUsuariosUsuariosAgentes: boolean = false
  public directorioUsuariosAgentesAgentes: boolean = false
  public activarChat: boolean = false
  public activarBardaPublica: boolean = false
  public activarBardaGrupo: boolean = false

  public chat: string = ""

  public regiones: any[] = []
  public localidades1: any[] = []
  public localidades2: any[] = []
  public usuariosPublicadores: any[] = []

  public selectedRegion: any[] = [];
  public selectedLocalidad1: any[] = []
  public selectedLocalidad2: any[] = []
  public selectedUsuariosPublicadores: any[] = []

  constructor(
    private route: ActivatedRoute,
    private grupoService: GrupoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.idGrupo = Number.parseInt( params.get('id') || '0' );

        try {
          this.localidades1 = await this.grupoService.getLocalidades1(this.idGrupo, "")
          this.localidades2 = await this.grupoService.getLocalidades2(this.idGrupo, "")
          this.regiones = await this.grupoService.getRegiones(this.idGrupo, "")
          this.usuariosPublicadores = await this.grupoService.getUsuariosByGrupo(this.idGrupo, "")
          console.log(this.usuariosPublicadores)
        } catch (error) {
          console.log(error)
        }

      } else {
        console.log('okokok :>> ');
      }
    });
  }

  public async guardarCambios() {

    try {
      console.log(this.activarBardaPublica, this.activarBardaGrupo, this.allCanPost, this.directorioUsuarios)
      if(this.directorioUsuarios){
        console.log(this.directorioUsuariosTodos, this.directorioUsuariosUsuariosAgentes, this.directorioUsuariosAgentesAgentes)
      }
    } catch (error) {
      console.log(error)
    }
  }

}
