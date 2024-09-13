import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuestionario-para-usuarios',
  templateUrl: './cuestionario-para-usuarios.component.html',
  styleUrls: ['./cuestionario-para-usuarios.component.scss'],
})
export class CuestionarioParaUsuariosComponent implements OnInit {
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

  // drop(event: CdkDragDrop<any>) {
  //   const original = event.previousIndex;
  //   const nueva = event.currentIndex;
  //   moveItemInArray(this.movies, original, nueva);
  //   console.log('this.movies :>> ', this.movies);
  // }

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
