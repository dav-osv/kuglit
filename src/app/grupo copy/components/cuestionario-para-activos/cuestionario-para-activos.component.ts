import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuestionario-para-activos',
  templateUrl: './cuestionario-para-activos.component.html',
  styleUrls: ['./cuestionario-para-activos.component.scss'],
})
export class CuestionarioParaActivosComponent implements OnInit {
  public idGrupo = '';
  public movies = [
    {
      name: 'Episode I',
      title: 'The Phantom Menace',
    },
    {
      name: 'Episode II',
      title: 'Attack of the Clones',
    },
    {
      name: 'Episode III',
      title: 'Revenge of the Sith',
    },
    {
      name: 'Episode IV',
      title: 'A New Hope',
    },
    {
      name: 'Episode V',
      title: 'The Empire Strikes Back',
    },
    {
      name: 'Episode VI',
      title: 'Return of the Jedi',
    },
    {
      name: 'Episode VII',
      title: 'The Force Awakens',
    },
    {
      name: 'Episode VIII',
      title: 'The Last Jed',
    },
    {
      name: 'Episode IX',
      title: 'The Rise of Skywalker',
    },
  ];

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
