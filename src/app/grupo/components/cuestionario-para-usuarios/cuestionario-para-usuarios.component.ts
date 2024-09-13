import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/solicitudes/services/mensajes.service';
import { Cuestionario } from '../../interfaces/Cuestionario';
import { CuestionarioParaUsuariosService } from '../../services/cuestionario-para-usuarios.service';

@Component({
  selector: 'app-cuestionario-para-usuarios',
  templateUrl: './cuestionario-para-usuarios.component.html',
  styleUrls: ['./cuestionario-para-usuarios.component.scss'],
})
export class CuestionarioParaUsuariosComponent implements OnInit {
  public idGrupo = 0;
  public preguntas = [];


  constructor(
    private cuetionarioService: CuestionarioParaUsuariosService,
    private route: ActivatedRoute,
    private mensajes: MensajesService
  ) {}

  ngOnInit(): void {
    this.getIdGrupo();
  }

  getIdGrupo() {
    this.route.paramMap.subscribe(async params => {
      if (params.has('id')) {
        this.idGrupo = Number.parseInt(params.get('id') || '0');

        try {
          this.preguntas = (await this.cuetionarioService.getCuestionario(this.idGrupo)).datos
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('okokok :>> ');
      }
    });
  }

  public async onClickEditar(pregunta: Cuestionario) {
    try {
      console.log(pregunta)
      await this.cuetionarioService.editarPregunta(pregunta)
      this.preguntas = (await this.cuetionarioService.getCuestionario(this.idGrupo)).datos
      this.mensajes.printToast("success", "Cuestionario para usuarios", "Pregunta actualizada correctamente")
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "CUestionario para usuarios", "Error actualizando la pregunta seleccionada, intene mas tarde")
    }
  }

  public async onClickBorrar(pregunta: Cuestionario) {
    try {
      await this.cuetionarioService.eliminarPregunta(pregunta)
      this.mensajes.printToast("success", "Cuestionario para usuarios", "Pregunta eliminada correctamente")
      this.preguntas = (await this.cuetionarioService.getCuestionario(this.idGrupo)).datos
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Cuestionario para usuarios", "Error eliminando la pregunta seleccionada, intene mas tarde")
    }
  }

  public async nuevaPregunta(pregunta: Cuestionario) {
    try {
      console.log(pregunta)
      pregunta.idGrupo = this.idGrupo

      await this.cuetionarioService.nuevaPregunta(pregunta)
      this.mensajes.printToast("success", "Cuestionario para usuarios", "Pregunta agregada correctamente")
      this.preguntas = (await this.cuetionarioService.getCuestionario(this.idGrupo)).datos
    } catch (error) {
      console.log(error)
      this.mensajes.printToast("error", "Cuestionario para usuarios", "Error agregando la pregunta, intente mas tarde")
    }
  }
}
