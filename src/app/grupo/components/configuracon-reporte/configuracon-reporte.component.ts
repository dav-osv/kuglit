import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracon-reporte',
  templateUrl: './configuracon-reporte.component.html',
  styleUrls: ['./configuracon-reporte.component.scss'],
})
export class ConfiguraconReporteComponent implements OnInit {
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
