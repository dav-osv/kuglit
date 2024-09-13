import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from '../../interfaces/Cuestionario';

@Component({
  selector: 'app-cuestionario-para-ordenes',
  templateUrl: './cuestionario-para-ordenes.component.html',
  styleUrls: ['./cuestionario-para-ordenes.component.scss'],
})
export class CuestionarioParaOrdenesComponent implements OnInit {
  public idGrupo = -1;
  public preguntas: Cuestionario[] = []

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getIdGrupo();
  }

  getIdGrupo() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.idGrupo = Number.parseInt(params.get('id') || '0');
        console.log('this.idGrupo :>> ', this.idGrupo);
      } else {
        console.log('okokok :>> ');
      }
    });
  }
}
