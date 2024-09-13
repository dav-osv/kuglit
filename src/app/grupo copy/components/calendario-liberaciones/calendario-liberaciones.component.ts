import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendario-liberaciones',
  templateUrl: './calendario-liberaciones.component.html',
  styleUrls: ['./calendario-liberaciones.component.scss'],
})
export class CalendarioLiberacionesComponent implements OnInit {
  public idGrupo = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getIdGrupo();
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
}
